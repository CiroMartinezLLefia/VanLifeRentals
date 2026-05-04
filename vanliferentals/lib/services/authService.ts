import { LoginInput, RegisterInput, User, UserSafe } from "../types";
import {
  createUser,
  findUserByEmail,
  validateUserPassword,
} from "../mockData";

function toSafeUser(user: User): UserSafe {
  const { password, ...safeUser } = user;
  return safeUser;
}

export function userExistsByEmail(email: string): boolean {
  return Boolean(findUserByEmail(email));
}

export function registerUserService(input: RegisterInput): UserSafe {
  return toSafeUser(createUser(input));
}

export function loginUserService(input: LoginInput): UserSafe | undefined {
  const user = findUserByEmail(input.email);
  if (!user || !validateUserPassword(user, input.password)) {
    return undefined;
  }
  return toSafeUser(user);
}
