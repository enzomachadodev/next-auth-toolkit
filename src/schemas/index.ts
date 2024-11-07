import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email("Email is required"),
  password: z.string().min(6, {
    message: "Min password lenght is 6 characters",
  }),
});
