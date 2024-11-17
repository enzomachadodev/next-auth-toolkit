import { ExtendedUser } from "@/types/next-auth";
import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";

export const currentUser = async (): Promise<ExtendedUser | undefined> => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async (): Promise<UserRole | undefined> => {
  const session = await auth();

  return session?.user.role;
};

export const getAuthenticatedUser = async (): Promise<ExtendedUser | null> => {
  const user = await currentUser();

  if (!user) return null;

  const dbUser = await getUserById(user.id);

  if (!dbUser) return null;

  return user;
};
