"use server";

import { z } from "zod";
import { resetPasswordSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateResetPasswordToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";

export const resetPassword = async (
  data: z.infer<typeof resetPasswordSchema>,
) => {
  const validatedFields = resetPasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid email!",
    };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generateResetPasswordToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return {
    success: "Reset password email has been sent!",
  };
};
