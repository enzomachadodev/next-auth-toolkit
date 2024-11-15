import { UserRole } from "@prisma/client";
import z from "zod";

const nameFieldSchema = z.string().min(2, {
  message: "Name is required",
});
const emailFieldSchema = z.string().email().min(2, {
  message: "Email is required",
});

const passwordFieldSchema = z.string().min(1, {
  message: "Password is required",
});

const newPasswordFieldSchema = z.string().min(6, {
  message: "Minimum of 6 characters required",
});

const codeFieldSchema = z.string();

const isTwoFactorEnabledFieldSchema = z.boolean();

const roleFieldSchema = z.enum([UserRole.ADMIN, UserRole.USER]);

export const settingsSchema = z
  .object({
    name: z.optional(nameFieldSchema),
    email: z.optional(emailFieldSchema),
    role: z.optional(roleFieldSchema),
    isTwoFactorEnabled: z.optional(isTwoFactorEnabledFieldSchema),
    oldPassword: z.optional(passwordFieldSchema),
    newPassword: z.optional(newPasswordFieldSchema),
  })
  .refine(
    (data) => {
      if (data.oldPassword && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New passwrod is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.oldPassword) {
        return false;
      }

      return true;
    },
    {
      message: "Passwrod is required!",
      path: ["password"],
    },
  );

export const newPasswordSchema = z.object({
  password: newPasswordFieldSchema,
});

export const resetPasswordSchema = z.object({
  email: emailFieldSchema,
});

export const loginSchema = z.object({
  email: emailFieldSchema,
  password: passwordFieldSchema,
  code: z.optional(codeFieldSchema),
});

export const registerSchema = z.object({
  name: nameFieldSchema,
  email: emailFieldSchema,
  password: newPasswordFieldSchema,
});
