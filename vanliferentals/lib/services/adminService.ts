import { prisma } from "@/lib/prisma";
import { User, UserRole, UserSafe } from "../types";

function toSafeUser(user: User): UserSafe {
  const { hashedPassword, ...safeUser } = user;
  return safeUser;
}

export async function listUsersService(): Promise<UserSafe[]> {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return users.map((user) =>
    toSafeUser({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      hashedPassword: user.hashedPassword,
    })
  );
}

export async function updateUserRoleService(
  userId: string,
  role: UserRole
): Promise<UserSafe | undefined> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return undefined;
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  return toSafeUser({
    id: updated.id,
    name: updated.name,
    email: updated.email,
    role: updated.role,
    hashedPassword: updated.hashedPassword,
  });
}
