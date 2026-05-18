import { getSession, requireRole } from "@/lib/auth";
import { updateUserRole } from "@/lib/controllers/adminController";
import { jsonResult, parseJson } from "@/lib/http";

type RouteParams = {
  params: {
    userId: string;
  };
};

export async function PUT(
  request: Request,
  { params }: RouteParams
) {
  const authCheck = requireRole(await getSession(), ["ADMIN"]);
  if (!authCheck.ok) {
    return jsonResult(authCheck);
  }

  const body = await parseJson(request);
  if (!body.ok) {
    return jsonResult(body);
  }

  const result = await updateUserRole(params.userId, body.data);
  return jsonResult(result);
}
