import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { NavBar } from "./_components/nav-bar";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="bg-blue-gradient flex h-full w-full flex-col items-center justify-center gap-y-10">
        <NavBar />
        {children}
      </div>
    </SessionProvider>
  );
};

export default ProtectedLayout;
