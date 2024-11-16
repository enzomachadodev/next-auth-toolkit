"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { newPasswordSchema, tokenSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";

export const newPassword = async (
  data: z.infer<typeof newPasswordSchema>,
  tokenValue?: string | null,
) => {
  if (!tokenValue) {
    return { error: "Missing token!" };
  }

  const validatedToken = tokenSchema.safeParse({ token: tokenValue });

  if (!validatedToken.success) {
    console.log("PASSOU AQUIIIIIIIII", validatedToken.error.errors);
    return { error: "Invalid token!" };
  }

  const { token } = validatedToken.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  // Verify new password data
  const validatedFields = newPasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedFields.data;

  const isSamePassword = await bcrypt.compare(
    password,
    existingUser.passwordHash || "",
  );
  if (isSamePassword) {
    return { error: "New password cannot be the same as the old password!" };
  }

  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: existingUser.id },
        data: { passwordHash: await bcrypt.hash(password, 7) },
      }),
      prisma.resetPasswordToken.delete({
        where: { id: existingToken.id },
      }),
    ]);

    return { success: "Password updated successfully!" };
  } catch (error) {
    console.error("Error updating password:", error);
    return { error: "An error occurred while updating the password." };
  }
};
