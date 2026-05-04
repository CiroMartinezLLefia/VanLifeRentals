import { login } from "@/lib/controllers/authController";
import { jsonResult, parseJson } from "@/lib/http";

export async function POST(request: Request) {
  const body = await parseJson(request);
  if (!body.ok) {
    return jsonResult(body);
  }

  const result = login(body.data);
  return jsonResult(result);
}
