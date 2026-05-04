import { Result, UserSafe } from "../types";
import {
  loginUserService,
  registerUserService,
  userExistsByEmail,
} from "../services/authService";
import { validateLoginInput, validateRegisterInput } from "../validators";

export function register(payload: unknown): Result<UserSafe> {
  const validation = validateRegisterInput(payload);
  if (!validation.ok) {
    return {
      ok: false,
      status: 400,
      error: { message: "Validation failed", details: validation.errors },
    };
  }

  if (userExistsByEmail(validation.data.email)) {
    return {
      ok: false,
      status: 409,
      error: { message: "Email already in use" },
    };
  }

  const user = registerUserService(validation.data);
  return { ok: true, data: user };
}

type LoginResponse = {
  user: UserSafe;
  token: string;
};

export function login(payload: unknown): Result<LoginResponse> {
  const validation = validateLoginInput(payload);
  if (!validation.ok) {
    return {
      ok: false,
      status: 400,
      error: { message: "Validation failed", details: validation.errors },
    };
  }

  const user = loginUserService(validation.data);
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
