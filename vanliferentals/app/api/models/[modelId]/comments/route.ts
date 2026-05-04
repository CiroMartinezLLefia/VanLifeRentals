import { getMockSession, requireAuth } from "@/lib/auth";
import { createComment, listComments } from "@/lib/controllers/commentsController";
import { jsonResult, parseJson } from "@/lib/http";

type RouteParams = {
  params: {
    modelId: string;
  };
};

export async function GET(
  _request: Request,
  { params }: RouteParams
) {
  return jsonResult(listComments(params.modelId));
}

export async function POST(
  request: Request,
  { params }: RouteParams
) {
  const authCheck = requireAuth(getMockSession(request));
  if (!authCheck.ok) {
    return jsonResult(authCheck);
  }

  const body = await parseJson(request);
  if (!body.ok) {
    return jsonResult(body);
  }

  const result = createComment(
    params.modelId,
    authCheck.data.userId,
    body.data
  );
  return jsonResult(result, 201);
}
