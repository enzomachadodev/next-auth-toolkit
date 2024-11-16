"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SettingsForm } from "@/components/auth/settings-form";
import { useTransition } from "react";
import { updatePassword } from "@/actions/update-password";
import { toast } from "sonner";

const SettingsPage = () => {
  const [isPending, startTransition] = useTransition();

  const user = useCurrentUser();

  const handleUpdatePassword = () => {
    startTransition(() => {
      updatePassword().then((data) => {
        if (data.success) {
          toast.success(data.success);
        }

        if (data.error) {
          toast.success(data.error);
        }
      });
    });
  };

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <p className="text-center text-2xl font-semibold">⚙️ Settings</p>
      </CardHeader>
      <CardContent>
        <SettingsForm />
        {user?.isOAuth === false && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Email</p>

              <div className="flex items-center gap-4">
                <p className="max-w-[140px] truncate font-mono text-xs">
                  {user?.email}
                </p>
                <Button asChild size="sm" variant="outline">
                  <Link href="/auth/update-email">Change</Link>
                </Button>
              </div>
            </div>
            <div className="h-px w-full bg-muted" />
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Password</p>

              <Button
                size="sm"
                variant="outline"
                onClick={handleUpdatePassword}
                isPending={isPending}
              >
                Change
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
