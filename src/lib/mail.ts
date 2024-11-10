import { env } from "@/config/env";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${env.APP_URL}/auth/new-verification?token=${token}`;

  const { error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Confirm your email",
    html: `
      <div>
        <h1>Welcome!</h1>
        <p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>
      </div>
    `,
  });

  if (error) {
    return console.log("RESEND ERROR:", error);
  }
};
