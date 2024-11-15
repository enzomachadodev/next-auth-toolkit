import { type DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

type ExtendedUser = {
  id: string;
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
} & DefaultSession["user"];

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
