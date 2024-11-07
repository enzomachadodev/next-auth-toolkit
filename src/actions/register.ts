"use server";

import { z } from "zod";
import { registerSchema } from "@/schemas";

export const register = async (data: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  return { success: "Email sent!" };
};
