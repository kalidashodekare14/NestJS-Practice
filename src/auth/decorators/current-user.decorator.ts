import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { AuthUser } from "../types/auth-user.type.js";



export const CurrentUser = createParamDecorator(
    (data: keyof AuthUser | undefined, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();

        const user = request.user

        if (!data) {
            return user;
        }

        return request.user[data];
    }
)