export type UserRole = "USER" | "EDITOR" | "ADMIN";

export type User = {
  id: string;
  name?: string | null;
  email: string;
  role: UserRole;
  hashedPassword?: string | null;
};

export type UserSafe = Omit<User, "hashedPassword">;

export type Model = {
  id: string;
  slug: string;
  name: string;
  description: string;
  pricePerDay: number;
  currency: string;
  seats?: number | null;
  beds?: number | null;
  transmission?: string | null;
  fuel?: string | null;
  features: string[];
  imageUrl: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  id: string;
  modelId: string;
  userId: string;
  content: string;
  rating?: number | null;
  createdAt: string;
};

export type ContactRequest = {
  id: string;
  fullName: string;
  email: string;
  phone?: string | null;
  message: string;
  pickupDate?: string | null;
  returnDate?: string | null;
  createdAt: string;
};

export type ModelInput = {
  name: string;
  description: string;
  pricePerDay: number;
  features: string[];
  imageUrl: string;
  currency?: string;
  seats?: number;
  beds?: number;
  transmission?: string;
  fuel?: string;
  isFeatured?: boolean;
};

export type ModelUpdateInput = Partial<ModelInput>;

export type CommentInput = {
  content: string;
};

export type ContactInput = {
  fullName: string;
  email: string;
  phone?: string;
  message: string;
  pickupDate?: string;
  returnDate?: string;
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
