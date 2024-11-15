"use client";

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  const user = useCurrentUser();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {JSON.stringify(user)}
      <Button onClick={handleLogout}>Sign out</Button>
    </div>
  );
};

export default SettingsPage;
