import { getSession, requireRole } from "@/lib/auth";
import { updateUserRole } from "@/lib/controllers/adminController";
import { jsonResult, parseJson } from "@/lib/http";


export async function PUT(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const authCheck = requireRole(await getSession(), ["ADMIN"]);
  if (!authCheck.ok) {
    return jsonResult(authCheck);
  }

  const body = await parseJson(request);
  if (!body.ok) {
    return jsonResult(body);
  }

  const result = await updateUserRole(userId, body.data);
  return jsonResult(result);
}
