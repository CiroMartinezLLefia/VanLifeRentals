import { auth } from "@/auth";
import { Result, UserRole } from "./types";

export type Session = Awaited<ReturnType<typeof auth>>;

const roleValues: UserRole[] = ["USER", "EDITOR", "ADMIN"];

function isUserRole(value: string): value is UserRole {
  return roleValues.includes(value as UserRole);
}

export async function getSession(): Promise<Session> {
  return auth();
}

export function requireAuth(session: Session | null): Result<Session> {
  if (!session?.user?.id) {
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
  const role = auth.data.user?.role ?? "";
  if (!isUserRole(role) || !roles.includes(role)) {
    return { ok: false, status: 403, error: { message: "Access denied" } };
  }
  return auth;
}
