import { User, UserRole, UserSafe } from "../types";
import { listUsers, updateUserRole } from "../mockData";

function toSafeUser(user: User): UserSafe {
  const { password, ...safeUser } = user;
  return safeUser;
}

export function listUsersService(): UserSafe[] {
  return listUsers().map((user) => toSafeUser(user));
}

export function updateUserRoleService(
  userId: string,
  role: UserRole
): UserSafe | undefined {
  const user = updateUserRole(userId, role);
  return user ? toSafeUser(user) : undefined;
}
