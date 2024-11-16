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
    return { error: "Invalid email format!" };
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { success: "If the email exists, a reset link has been sent." };
  }

  try {
    const passwordResetToken = await generateResetPasswordToken(email);
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token,
    );

    return { success: "Reset password email has been sent!" };
  } catch (error) {
    console.error("Error generating password reset:", error);
    return { error: "An error occurred while processing your request." };
  }
};
