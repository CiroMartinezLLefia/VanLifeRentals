import { getMockSession, requireRole } from "@/lib/auth";
import { createModel, listModels } from "@/lib/controllers/modelsController";
import { jsonResult, parseJson } from "@/lib/http";

export async function GET() {
  return jsonResult(listModels());
}

export async function POST(request: Request) {
  const authCheck = requireRole(getMockSession(request), ["EDITOR", "ADMIN"]);
  if (!authCheck.ok) {
    return jsonResult(authCheck);
  }

  const body = await parseJson(request);
  if (!body.ok) {
    return jsonResult(body);
  }

  const result = createModel(body.data);
  return jsonResult(result, 201);
}
