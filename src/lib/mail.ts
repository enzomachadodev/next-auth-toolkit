import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorEmail = async (email: string, token: string) => {
  const { error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "2FA Code",
    html: `
      <div>
        <h1>Hi!</h1>
        <p>Your 2FA code: ${token}.</p>
      </div>
    `,
  });

  if (error) {
    return console.error("RESEND ERROR:", error);
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.APP_URL}/auth/new-password?token=${token}`;

  const { error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Reset your password",
    html: `
      <div>
        <h1>Hi!</h1>
        <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
      </div>
    `,
  });

  if (error) {
    return console.error("RESEND ERROR:", error);
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.APP_URL}/auth/new-verification?token=${token}`;

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
