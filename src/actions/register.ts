"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const register = async (data: z.infer<typeof registerSchema>) => {
  const validatedData = registerSchema.safeParse(data);

  if (!validatedData.success) {
    return { error: "Invalid fields!" };
  }

  const { email, name, password } = validatedData.data;

  const emailExists = await getUserByEmail(email);

  if (emailExists) {
    return {
      error: "Email already in use",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 7);

  await prisma.user.create({
    data: {
      email,
      name,
      passwordHash: hashedPassword,
    },
  });

  // TODO: Send verification token email

  return { success: "Email sent!" };
};
