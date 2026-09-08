import type { Request } from 'express';
import type { AuthUser } from '../../auth/types/auth-user.type.js';

export interface AuthenticatedRequest extends Request {
  user: AuthUser;
}