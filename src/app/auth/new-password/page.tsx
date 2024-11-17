import { Suspense } from "react";
import { NewPasswordForm } from "@/components/auth/new-password-form";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const NewPasswordPage = async () => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <Suspense>
        <NewPasswordForm />
      </Suspense>
    </SessionProvider>
  );
};

export default NewPasswordPage;
