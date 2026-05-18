import { createContact } from "@/lib/controllers/contactController";
import { jsonResult, parseJson } from "@/lib/http";

export async function POST(request: Request) {
  const body = await parseJson(request);
  if (!body.ok) {
    return jsonResult(body);
  }

  const result = await createContact(body.data);
  return jsonResult(result, 201);
}
