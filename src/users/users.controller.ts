import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseFloatPipe, ParseIntPipe, Patch, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { LoggingInterceptor } from '../logging/logging.interceptor.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import type { AuthUser } from '../auth/types/auth-user.type.js';
import { UpdateUserDto } from './dto/update-user.dto.js';


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles("ADMIN")
    @Get("admin-data")
    getAdminData() {
        return {
            success: true,
            message: "Admin data retrieved successfully"
        }
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles("ADMIN")
    @Delete(":id")
    async deleteUser(@Param('id') id: string) {
        return {
            success: true,
            message: "User data delete successfully",
            data: await this.usersService.deleteUser(id)
        }
    }


    @UseInterceptors(LoggingInterceptor)
    @Get()
    getUsers() {
        return {
            success: true,
            message: "Users retrieved successfully",
            data: this.usersService.getUsers(),
        }
    }

    @UseGuards(AuthGuard)
    @Get("profile")
    async getProfile(@CurrentUser("sub") userId: string) {
        const result = await this.usersService.getProfile(userId)
        return {
            success: true,
            message: "Profile info get sucessfully",
            data: result,
        }
    }
    @UseGuards(AuthGuard)
    @Patch("profile")
    async updateProfile(
        @CurrentUser("sub") userId: string,
        @Body() body: UpdateUserDto
    ) {
        const result = await this.usersService.updateProfile(userId, body);

        return {
            success: true,
            message: "Profile data updated successfully",
            data: result
        }
    }

    @Get("config")
    getConfig() {
        return this.usersService.getConfig();
    }

    @Get(":id")
    async getUser(@Param("id") id: string) {
        return {
            success: true,
            message: 'User retrieved successfully',
            data: await this.usersService.getUser(id),
        }
    }

    @Post()
    createUser(@Body() body: CreateUserDto) {
        return {
            success: true,
            message: 'User retrieved successfully',
            data: body
        }
    }
}
