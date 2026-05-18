import { Comment, Result } from "../types";
import {
  createCommentService,
  listCommentsService,
} from "../services/commentsService";
import { getModelService } from "../services/modelsService";
import { validateCommentInput } from "../validators";

export async function listComments(
  modelId: string
): Promise<Result<Comment[]>> {
  const model = await getModelService(modelId);
  if (!model) {
    return { ok: false, status: 404, error: { message: "Model not found" } };
  }
  return { ok: true, data: await listCommentsService(model.id) };
}

export async function createComment(
  modelId: string,
  userId: string,
  payload: unknown
): Promise<Result<Comment>> {
  const model = await getModelService(modelId);
  if (!model) {
    return { ok: false, status: 404, error: { message: "Model not found" } };
  }

  const validation = validateCommentInput(payload);
  if (!validation.ok) {
    return {
      ok: false,
      status: 400,
      error: { message: "Validation failed", details: validation.errors },
    };
  }

  const comment = await createCommentService(
    model.id,
    userId,
    validation.data.content
  );
  return { ok: true, data: comment };
}
