export type UserRole = "USER" | "EDITOR" | "ADMIN";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password: string;
};

export type UserSafe = Omit<User, "password">;

export type Model = {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  features: string[];
  imageUrl?: string;
};

export type Comment = {
  id: string;
  modelId: string;
  userId: string;
  content: string;
  createdAt: string;
};

export type ContactRequest = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export type ModelInput = {
  name: string;
  description: string;
  pricePerDay: number;
  features: string[];
  imageUrl?: string;
};

export type ModelUpdateInput = Partial<ModelInput>;

export type CommentInput = {
  content: string;
};

export type ContactInput = {
  name: string;
  email: string;
  message: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type RoleUpdateInput = {
  role: UserRole;
};

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; error: { message: string; details?: string[] } };
