import { Result, UserSafe } from "../types";
import {
  listUsersService,
  updateUserRoleService,
} from "../services/adminService";
import { validateRoleUpdateInput } from "../validators";

export function listUsers(): Result<UserSafe[]> {
  return { ok: true, data: listUsersService() };
}

export function updateUserRole(
  userId: string,
  payload: unknown
): Result<UserSafe> {
  const validation = validateRoleUpdateInput(payload);
  if (!validation.ok) {
    return {
      ok: false,
      status: 400,
      error: { message: "Validation failed", details: validation.errors },
    };
  }

  const user = updateUserRoleService(userId, validation.data.role);
  if (!user) {
    return { ok: false, status: 404, error: { message: "User not found" } };
  }

  return { ok: true, data: user };
}
