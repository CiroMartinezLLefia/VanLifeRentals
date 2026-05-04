import { Comment, Result } from "../types";
import {
  createCommentService,
  listCommentsService,
} from "../services/commentsService";
import { getModelService } from "../services/modelsService";
import { validateCommentInput } from "../validators";

export function listComments(modelId: string): Result<Comment[]> {
  const model = getModelService(modelId);
  if (!model) {
    return { ok: false, status: 404, error: { message: "Model not found" } };
  }
  return { ok: true, data: listCommentsService(modelId) };
}

export function createComment(
  modelId: string,
  userId: string,
  payload: unknown
): Result<Comment> {
  const model = getModelService(modelId);
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

  const comment = createCommentService(
    modelId,
    userId,
    validation.data.content
  );
  return { ok: true, data: comment };
}
