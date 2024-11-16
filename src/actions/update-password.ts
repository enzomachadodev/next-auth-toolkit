"use server";

import { generateResetPasswordToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";
import { getAuthenticatedUser } from "@/lib/auth";

export const updatePassword = async () => {
  const user = await getAuthenticatedUser();

  if (!user) return { error: "Unauthorized!" };

  if (user.isOAuth) return { error: "OAuth user not allowed" };

  if (!user.email) return { error: "Something went wrong!" };

  try {
    const passwordResetToken = await generateResetPasswordToken(user.email);
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
