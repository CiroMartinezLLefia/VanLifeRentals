import {
  CommentInput,
  ContactInput,
  LoginInput,
  ModelInput,
  ModelUpdateInput,
  RegisterInput,
  RoleUpdateInput,
  UserRole,
} from "./types";

type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: string[] };

const roles: UserRole[] = ["USER", "EDITOR", "ADMIN"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateModelInput(data: unknown): ValidationResult<ModelInput> {
  if (!isRecord(data)) {
    return { ok: false, errors: ["Invalid payload"] };
  }

  const errors: string[] = [];

  if (!isNonEmptyString(data.name)) errors.push("name is required");
  if (!isNonEmptyString(data.description))
    errors.push("description is required");
  if (!isNumber(data.pricePerDay)) errors.push("pricePerDay is required");
  if (!isStringArray(data.features)) errors.push("features is required");

  if (errors.length > 0) return { ok: false, errors };

  const input: ModelInput = {
    name: asString(data.name),
    description: asString(data.description),
    pricePerDay: data.pricePerDay as number,
    features: data.features as string[],
    imageUrl: isNonEmptyString(data.imageUrl)
      ? asString(data.imageUrl)
      : undefined,
  };

  return { ok: true, data: input };
}

export function validateModelUpdateInput(
  data: unknown
): ValidationResult<ModelUpdateInput> {
  if (!isRecord(data)) {
    return { ok: false, errors: ["Invalid payload"] };
  }

  const input: ModelUpdateInput = {};
  const errors: string[] = [];

  if (data.name !== undefined) {
    if (!isNonEmptyString(data.name)) errors.push("name must be a string");
    else input.name = asString(data.name);
  }

  if (data.description !== undefined) {
    if (!isNonEmptyString(data.description))
      errors.push("description must be a string");
    else input.description = asString(data.description);
  }

  if (data.pricePerDay !== undefined) {
    if (!isNumber(data.pricePerDay))
      errors.push("pricePerDay must be a number");
    else input.pricePerDay = data.pricePerDay as number;
  }

  if (data.features !== undefined) {
    if (!isStringArray(data.features))
      errors.push("features must be a string array");
    else input.features = data.features as string[];
  }

  if (data.imageUrl !== undefined) {
    if (!isNonEmptyString(data.imageUrl))
      errors.push("imageUrl must be a string");
    else input.imageUrl = asString(data.imageUrl);
  }

  if (errors.length > 0) return { ok: false, errors };
  if (Object.keys(input).length === 0) {
    return { ok: false, errors: ["At least one field is required"] };
  }

  return { ok: true, data: input };
}

export function validateCommentInput(
  data: unknown
): ValidationResult<CommentInput> {
  if (!isRecord(data)) {
    return { ok: false, errors: ["Invalid payload"] };
  }
  if (!isNonEmptyString(data.content)) {
    return { ok: false, errors: ["content is required"] };
  }
  return { ok: true, data: { content: asString(data.content) } };
}

export function validateContactInput(
  data: unknown
): ValidationResult<ContactInput> {
  if (!isRecord(data)) {
    return { ok: false, errors: ["Invalid payload"] };
  }
  const errors: string[] = [];

  if (!isNonEmptyString(data.name)) errors.push("name is required");
  if (!isNonEmptyString(data.email)) errors.push("email is required");
  if (!isNonEmptyString(data.message)) errors.push("message is required");

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name: asString(data.name),
      email: asString(data.email),
      message: asString(data.message),
    },
  };
}

export function validateRegisterInput(
  data: unknown
): ValidationResult<RegisterInput> {
  if (!isRecord(data)) {
    return { ok: false, errors: ["Invalid payload"] };
  }
  const errors: string[] = [];
  if (!isNonEmptyString(data.name)) errors.push("name is required");
  if (!isNonEmptyString(data.email)) errors.push("email is required");
  if (!isNonEmptyString(data.password)) errors.push("password is required");

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name: asString(data.name),
      email: asString(data.email),
      password: asString(data.password),
    },
  };
}

export function validateLoginInput(
  data: unknown
): ValidationResult<LoginInput> {
  if (!isRecord(data)) {
    return { ok: false, errors: ["Invalid payload"] };
  }
  const errors: string[] = [];
  if (!isNonEmptyString(data.email)) errors.push("email is required");
  if (!isNonEmptyString(data.password)) errors.push("password is required");

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      email: asString(data.email),
      password: asString(data.password),
    },
  };
}

export function validateRoleUpdateInput(
  data: unknown
): ValidationResult<RoleUpdateInput> {
  if (!isRecord(data)) {
    return { ok: false, errors: ["Invalid payload"] };
  }
  if (!isNonEmptyString(data.role)) {
    return { ok: false, errors: ["role is required"] };
  }
  if (!roles.includes(data.role as UserRole)) {
    return { ok: false, errors: ["role is invalid"] };
  }
  return { ok: true, data: { role: data.role as UserRole } };
}
