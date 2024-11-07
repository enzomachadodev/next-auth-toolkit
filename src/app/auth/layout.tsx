import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-blue-gradient flex h-full w-full items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
