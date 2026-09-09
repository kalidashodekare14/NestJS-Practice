import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../generated/prisma/enums.js';


@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private readonly reflector: Reflector
    ) { }

    canActivate(context: ExecutionContext): boolean {

        const request = context.switchToHttp().getRequest();

        const requiredRoles = this.reflector.get<Role[]>(
            'roles',
            context.getHandler(),
        )

        if (!requiredRoles) {
            return true;
        }

        const user = request.user

        const hasRole = requiredRoles.includes(user.role);

        if(!hasRole){
            throw new ForbiddenException("You do not have permission to access this resource");
        }

        return hasRole;

    }


}