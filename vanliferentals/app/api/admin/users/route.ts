import { getSession, requireRole } from "@/lib/auth";
import { listUsers } from "@/lib/controllers/adminController";
import { jsonResult } from "@/lib/http";

export async function GET(request: Request) {
  const authCheck = requireRole(await getSession(), ["ADMIN"]);
  if (!authCheck.ok) {
    return jsonResult(authCheck);
  }

  return jsonResult(await listUsers());
}
