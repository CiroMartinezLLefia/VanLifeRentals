import { getSession, requireAuth } from "@/lib/auth";
import { createComment, listComments } from "@/lib/controllers/commentsController";
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
  return jsonResult(await listComments(modelId));
}

export async function POST(
  request: Request,
  { params }: RouteParams
) {
  const { modelId } = await params;
  const authCheck = requireAuth(await getSession());
  if (!authCheck.ok) {
    return jsonResult(authCheck);
  }

  const body = await parseJson(request);
  if (!body.ok) {
    return jsonResult(body);
  }

  const result = await createComment(
    modelId,
    authCheck.data.user?.id ?? "",
    body.data
  );
  return jsonResult(result, 201);
}
