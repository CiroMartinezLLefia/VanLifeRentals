import { prisma } from "@/lib/prisma";
import { Comment } from "../types";

function toComment(record: {
  id: string;
  modelId: string;
  userId: string | null;
  content: string;
  rating: number | null;
  createdAt: Date;
}): Comment {
  return {
    id: record.id,
    modelId: record.modelId,
    userId: record.userId ?? "",
    content: record.content,
    rating: record.rating,
    createdAt: record.createdAt.toISOString(),
  };
}

export async function listCommentsService(modelId: string): Promise<Comment[]> {
  const comments = await prisma.comment.findMany({
    where: { modelId },
    orderBy: { createdAt: "desc" },
  });
  return comments.map((comment) => toComment(comment));
}

export async function createCommentService(
  modelId: string,
  userId: string,
  content: string
): Promise<Comment> {
  const comment = await prisma.comment.create({
    data: {
      modelId,
      userId,
      content,
    },
  });
  return toComment(comment);
}
