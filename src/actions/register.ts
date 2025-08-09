"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (data: z.infer<typeof registerSchema>) => {
  const validatedData = registerSchema.safeParse(data);

  if (!validatedData.success) {
    return { error: "Invalid fields!" };
  }

  const { email, name, password } = validatedData.data;

  const emailExists = await getUserByEmail(email);

  if (emailExists) {
    return {
      error: "Email already in use",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 7);

  await prisma.user.create({
    data: {
      email,
      name,
      passwordHash: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  const result = await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  );

  if (result?.error) {
    return { error: result.error };
  }

  return { success: "Confirmation email sent!" };
};
