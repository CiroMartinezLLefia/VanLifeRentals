import { Comment } from "../types";
import { createComment, listCommentsByModel } from "../mockData";

export function listCommentsService(modelId: string): Comment[] {
  return listCommentsByModel(modelId);
}

export function createCommentService(
  modelId: string,
  userId: string,
  content: string
): Comment {
  return createComment(modelId, userId, content);
}
