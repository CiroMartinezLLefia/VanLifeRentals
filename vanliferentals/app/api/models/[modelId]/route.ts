import { getSession, requireRole } from "@/lib/auth";
import { getModel, updateModel } from "@/lib/controllers/modelsController";
import { jsonResult, parseJson } from "@/lib/http";

type RouteParams = {
  params: Promise<{
    modelId: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: RouteParams
) {
  const { modelId } = await params;
  return jsonResult(await getModel(modelId));
}

export async function PUT(
  request: Request,
  { params }: RouteParams
) {
  const { modelId } = await params;
  const authCheck = requireRole(await getSession(), ["EDITOR", "ADMIN"]);
  if (!authCheck.ok) {
    return jsonResult(authCheck);
  }

  const body = await parseJson(request);
  if (!body.ok) {
    return jsonResult(body);
  }

  const result = await updateModel(modelId, body.data);
  return jsonResult(result);
}
