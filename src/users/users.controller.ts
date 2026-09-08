import { Body, Controller, Get, Param, ParseBoolPipe, ParseFloatPipe, ParseIntPipe, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto.js';
import { AuthGuard } from '../auth/auth.guard.js';
import { LoggingInterceptor } from '../logging/logging.interceptor.js';
import type { AuthenticatedRequest } from '../common/types/authenticated-request.js';


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @UseInterceptors(LoggingInterceptor)
    @Get()
    getUsers(
        // @Query("page", ParseIntPipe) page: number,
        // @Query("limit", ParseIntPipe) limit: number,
        // @Query("price", ParseFloatPipe) price: number,
        // @Query("active", ParseBoolPipe) active: boolean,
    ) {
        return {
            success: true,
            message: "Users retrieved successfully",
            // page,
            // limit,
            // price,
            // active,
            data: this.usersService.getUsers(),
        }
    }

    @UseGuards(AuthGuard)
    @Get("profile")
    async getProfile(@Req() request: AuthenticatedRequest) {
        const result = await this.usersService.getProfile(request.user)
        return {
            success: true,
            message: "Profile info get sucessfully",
            data: result,
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
