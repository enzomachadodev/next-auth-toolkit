import { SessionProvider } from "next-auth/react";
import { NavBar } from "./_components/nav-bar";
import { auth } from "@/auth";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <div className="bg-blue-gradient flex min-h-screen w-full flex-col items-center justify-center gap-y-10 p-4">
        <NavBar />
        {children}
      </div>
    </SessionProvider>
  );
};

export default ProtectedLayout;
