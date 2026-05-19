import {
  Comment,
  ContactInput,
  ContactRequest,
  Model,
  ModelInput,
  ModelUpdateInput,
  RegisterInput,
  User,
  UserRole,
} from "./types";

const now = () => new Date().toISOString();
const makeId = () => Math.random().toString(36).slice(2, 10);
const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

let models: Model[] = [
  {
    id: "model-1",
    slug: "atlas-compact",
    name: "Atlas Compact",
    description: "Compact camper for two people.",
    pricePerDay: 89,
    currency: "EUR",
    isFeatured: true,
    features: ["2 beds", "kitchen", "solar"],
    imageUrl: "/models/atlas-compact.jpg",
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "model-2",
    slug: "sierra-family",
    name: "Sierra Family",
    description: "Family camper with extra storage.",
    pricePerDay: 129,
    currency: "EUR",
    isFeatured: false,
    features: ["4 beds", "bath", "awning"],
    imageUrl: "/models/sierra-family.jpg",
    createdAt: now(),
    updatedAt: now(),
  },
];

let users: User[] = [
  {
    id: "user-1",
    name: "Alex Smith",
    email: "alex@example.com",
    role: "USER",
    hashedPassword: "password123",
  },
  {
    id: "user-2",
    name: "Jamie Editor",
    email: "editor@example.com",
    role: "EDITOR",
    hashedPassword: "password123",
  },
  {
    id: "user-3",
    name: "Pat Admin",
    email: "admin@example.com",
    role: "ADMIN",
    hashedPassword: "password123",
  },
];

let comments: Comment[] = [
  {
    id: "comment-1",
    modelId: "model-1",
    userId: "user-1",
    content: "Great for weekend trips.",
    createdAt: now(),
  },
];

let contactRequests: ContactRequest[] = [];

export function listModels(): Model[] {
  return models;
}

export function findModelById(modelId: string): Model | undefined {
  return models.find((model) => model.id === modelId);
}

export function createModel(input: ModelInput): Model {
  const model: Model = {
    id: makeId(),
    slug: slugify(input.name),
    ...input,
    currency: input.currency ?? "EUR",
    isFeatured: input.isFeatured ?? false,
    createdAt: now(),
    updatedAt: now(),
  };
  models = [...models, model];
  return model;
}

export function updateModel(
  modelId: string,
  input: ModelUpdateInput
): Model | undefined {
  const index = models.findIndex((model) => model.id === modelId);
  if (index === -1) {
    return undefined;
  }
  const updated: Model = {
    ...models[index],
    ...input,
    updatedAt: now(),
  };
  models = [...models.slice(0, index), updated, ...models.slice(index + 1)];
  return updated;
}

export function listCommentsByModel(modelId: string): Comment[] {
  return comments.filter((comment) => comment.modelId === modelId);
}

export function createComment(
  modelId: string,
  userId: string,
  content: string
): Comment {
  const comment: Comment = {
    id: makeId(),
    modelId,
    userId,
    content,
    createdAt: now(),
  };
  comments = [...comments, comment];
  return comment;
}

export function createContactRequest(input: ContactInput): ContactRequest {
  const contactRequest: ContactRequest = {
    id: makeId(),
    fullName: input.fullName,
    email: input.email,
    phone: input.phone ?? null,
    message: input.message,
    pickupDate: input.pickupDate ?? null,
    returnDate: input.returnDate ?? null,
    createdAt: now(),
  };
  contactRequests = [...contactRequests, contactRequest];
  return contactRequest;
}

export function listUsers(): User[] {
  return users;
}

export function findUserById(userId: string): User | undefined {
  return users.find((user) => user.id === userId);
}

export function findUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email === email);
}

export function createUser(input: RegisterInput, role: UserRole = "USER"): User {
  const user: User = {
    id: makeId(),
    name: input.name,
    email: input.email,
    role,
    hashedPassword: input.password,
  };
  users = [...users, user];
  return user;
}

export function updateUserRole(userId: string, role: UserRole): User | undefined {
  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    return undefined;
  }
  const updated: User = { ...users[index], role };
  users = [...users.slice(0, index), updated, ...users.slice(index + 1)];
  return updated;
}

export function validateUserPassword(user: User, password: string): boolean {
  return user.hashedPassword === password;
}
