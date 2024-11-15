"use server";

import bcrypt from "bcryptjs";

import { z } from "zod";

import { prisma } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { settingsSchema } from "@/schemas";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail, getUserById } from "@/data/user";

export const settings = async (data: z.infer<typeof settingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  if (user.isOAuth) {
    data.email = undefined;
    data.password = undefined;
    data.newPassword = undefined;
    data.isTwoFactorEnabled = undefined;
  }

  if (data.email && data.email !== user.email) {
    const existingUser = await getUserByEmail(data.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(data.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "Verification email sent!" };
  }

  if (data.password && data.newPassword && dbUser.passwordHash) {
    const passwordMatch = await bcrypt.compare(
      data.password,
      dbUser.passwordHash,
    );

    if (!passwordMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedPassowrd = await bcrypt.hash(data.password, 7);

    data.password = hashedPassowrd;
    data.newPassword = undefined;
  }

  const { email, isTwoFactorEnabled, name, password, role } = data;

  await prisma.user.update({
    where: { id: dbUser.id },
    data: {
      name,
      email,
      isTwoFactorEnabled,
      passwordHash: password,
      role,
    },
  });

  return { success: "User updated" };
};
