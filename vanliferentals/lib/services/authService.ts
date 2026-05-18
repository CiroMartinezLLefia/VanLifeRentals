import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { LoginInput, RegisterInput, User, UserSafe } from "../types";

function toSafeUser(user: User): UserSafe {
  const { hashedPassword, ...safeUser } = user;
  return safeUser;
}

export async function userExistsByEmail(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { email } });
  return Boolean(user);
}

export async function registerUserService(
  input: RegisterInput
): Promise<UserSafe> {
  const hashedPassword = await bcrypt.hash(input.password, 10);
  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      hashedPassword,
      role: "USER",
    },
  });

  return toSafeUser({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    hashedPassword: user.hashedPassword,
  });
}

export async function loginUserService(
  input: LoginInput
): Promise<UserSafe | undefined> {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user || !user.hashedPassword) {
    return undefined;
  }

  const isValid = await bcrypt.compare(input.password, user.hashedPassword);
  if (!isValid) {
    return undefined;
  }

  return toSafeUser({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    hashedPassword: user.hashedPassword,
  });
}
