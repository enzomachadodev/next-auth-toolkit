import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "./db";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import {
  ResetPasswordToken,
  TwoFactorToken,
  VerificationToken,
} from "@prisma/client";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

const generateExpirationDate = (timeInMinutes: number = 60) => {
  const timeInMilliseconds = timeInMinutes * 60 * 1000;
  return new Date(new Date().getTime() + timeInMilliseconds);
};

const generateRandomInt = () => {
  return crypto.randomInt(100_000, 1_000_000).toString();
};

export const generateTwoFactorToken = async (
  email: string,
): Promise<TwoFactorToken> => {
  const token = generateRandomInt();
  const expires = generateExpirationDate(15);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

export const generateResetPasswordToken = async (
  email: string,
): Promise<ResetPasswordToken> => {
  const token = uuidv4();
  const expires = generateExpirationDate();

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await prisma.resetPasswordToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await prisma.resetPasswordToken.create({
    data: {
      email,
      expires,
      token,
    },
  });

  return passwordResetToken;
};

export const generateVerificationToken = async (
  email: string,
): Promise<VerificationToken> => {
  const token = uuidv4();
  const expires = generateExpirationDate();

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      expires,
      token,
    },
  });

  return verificationToken;
};
