import { Result, UserRole } from "./types";

export type Session = {
  userId: string;
  role: UserRole;
};

const roleValues: UserRole[] = ["USER", "EDITOR", "ADMIN"];

function isUserRole(value: string): value is UserRole {
  return roleValues.includes(value as UserRole);
}

export function getMockSession(request: Request): Session | null {
  const userId = request.headers.get("x-user-id");
  const roleHeader = request.headers.get("x-user-role");
  if (!userId || !roleHeader) {
    return null;
  }
  if (!isUserRole(roleHeader)) {
    return null;
  }
  return { userId, role: roleHeader };
}

export function requireAuth(session: Session | null): Result<Session> {
  if (!session) {
    return {
      ok: false,
      status: 401,
      error: { message: "Authentication required" },
    };
  }
  return { ok: true, data: session };
}

export function requireRole(
  session: Session | null,
  roles: UserRole[]
): Result<Session> {
  const auth = requireAuth(session);
  if (!auth.ok) {
    return auth;
  }
  if (!roles.includes(auth.data.role)) {
    return { ok: false, status: 403, error: { message: "Access denied" } };
  }
  return auth;
}
