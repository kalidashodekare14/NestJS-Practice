import type { Role } from "../../generated/prisma/enums.js";

export interface AuthUser {
  sub: string;
  email: string;
  role: Role
}