"use client";

import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { admin } from "@/actions/admin";

const AdminPage = () => {
  const handleServerActionClick = () => {
    admin().then((data) => {
      if (data.sucess) {
        toast.success(data.sucess);
      }

      if (data.error) {
        toast.success(data.error);
      }
    });
  };

  const handleApiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed API Route!");
      } else {
        toast.error("Forbidden API Route!");
      }
    });
  };

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">Admin 🔑</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content!" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={handleApiRouteClick}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={handleServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
