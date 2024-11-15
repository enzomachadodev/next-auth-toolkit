import { type DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

type ExtendedUser = {
  role: UserRole;
  isTwoFactorEnabled: boolean;
} & DefaultSession["user"];

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
