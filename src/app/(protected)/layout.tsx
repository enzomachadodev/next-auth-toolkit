import { NavBar } from "./_components/nav-bar";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-blue-gradient flex min-h-screen w-full flex-col items-center justify-center gap-y-10 p-4">
      <NavBar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
