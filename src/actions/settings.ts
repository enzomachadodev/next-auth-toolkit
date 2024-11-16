"use server";

import { z } from "zod";

import { prisma } from "@/lib/db";
import { getAuthenticatedUser } from "@/lib/auth";
import { settingsSchema } from "@/schemas";

export const settings = async (data: z.infer<typeof settingsSchema>) => {
  const user = await getAuthenticatedUser();

  if (!user) return { error: "Unauthorized!" };

  const validatedFields = settingsSchema.safeParse(data);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, isTwoFactorEnabled, role } = validatedFields.data;

  const updateData: Record<string, string | boolean> = {};

  if (name) {
    updateData.name = name;
  }

  if (typeof isTwoFactorEnabled !== "undefined" && !user.isOAuth) {
    updateData.isTwoFactorEnabled = isTwoFactorEnabled;
  }

  if (role) {
    updateData.role = role;
  }

  if (Object.keys(updateData).length === 0) {
    return { error: "No changes to update." };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: updateData,
  });

  return { success: "Settings updated!" };
};
