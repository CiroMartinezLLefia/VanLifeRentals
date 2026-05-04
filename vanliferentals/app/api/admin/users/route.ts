import { getMockSession, requireRole } from "@/lib/auth";
import { listUsers } from "@/lib/controllers/adminController";
import { jsonResult } from "@/lib/http";

export async function GET(request: Request) {
  const authCheck = requireRole(getMockSession(request), ["ADMIN"]);
  if (!authCheck.ok) {
    return jsonResult(authCheck);
  }

  return jsonResult(listUsers());
}
