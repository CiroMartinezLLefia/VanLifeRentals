import { getSession, requireRole } from "@/lib/auth";
import { createModel, listModels } from "@/lib/controllers/modelsController";
import { jsonResult, parseJson } from "@/lib/http";

export async function GET() {
  return jsonResult(await listModels());
}

export async function POST(request: Request) {
  const authCheck = requireRole(await getSession(), ["EDITOR", "ADMIN"]);
  if (!authCheck.ok) {
    return jsonResult(authCheck);
  }

  const body = await parseJson(request);
  if (!body.ok) {
    return jsonResult(body);
  }

  const result = await createModel(body.data);
  return jsonResult(result, 201);
}
