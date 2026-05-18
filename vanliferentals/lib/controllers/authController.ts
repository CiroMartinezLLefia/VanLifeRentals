import { Result, UserSafe } from "../types";
import {
  loginUserService,
  registerUserService,
  userExistsByEmail,
} from "../services/authService";
import { validateLoginInput, validateRegisterInput } from "../validators";

export async function register(payload: unknown): Promise<Result<UserSafe>> {
  const validation = validateRegisterInput(payload);
  if (!validation.ok) {
    return {
      ok: false,
      status: 400,
      error: { message: "Validation failed", details: validation.errors },
    };
  }

  if (await userExistsByEmail(validation.data.email)) {
    return {
      ok: false,
      status: 409,
      error: { message: "Email already in use" },
    };
  }

  const user = await registerUserService(validation.data);
  return { ok: true, data: user };
}

type LoginResponse = {
  user: UserSafe;
  token: string;
};

export async function login(payload: unknown): Promise<Result<LoginResponse>> {
  const validation = validateLoginInput(payload);
  if (!validation.ok) {
    return {
      ok: false,
      status: 400,
      error: { message: "Validation failed", details: validation.errors },
    };
  }

  const user = await loginUserService(validation.data);
  if (!user) {
    return {
      ok: false,
      status: 401,
      error: { message: "Invalid credentials" },
    };
  }

  return {
    ok: true,
    data: {
      user,
      token: "mock-token",
    },
  };
}
