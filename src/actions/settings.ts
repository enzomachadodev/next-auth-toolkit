"use server";

import { z } from "zod";

import { prisma } from "@/lib/db";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { settingsSchema } from "@/schemas";

export const settings = async (data: z.infer<typeof settingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  await prisma.user.update({
    where: { id: dbUser.id },
    data,
  });

  return { success: "User updated" };
};
