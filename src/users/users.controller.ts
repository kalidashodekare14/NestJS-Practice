import { Body, Controller, Get, Param, ParseBoolPipe, ParseFloatPipe, ParseIntPipe, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto.js';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get()
    getUsers(
        @Query("page", ParseIntPipe) page: number,
        @Query("limit", ParseIntPipe) limit: number,
        @Query("price", ParseFloatPipe) price: number,
        @Query("active", ParseBoolPipe) active: boolean,
    ){
        return {
            success: true,
            message: "Users retrieved successfully",
            page,
            limit,
            price,
            active,
            data: this.usersService.getUsers(),
        }
    }

    @Get("profile")
    getProfile(){
        return {
            success: true,
            message: "Profile info get sucessfully",
            data: this.usersService.getProfile(),
        }
    }

    @Get(":id")
    getUser(@Param("id", ParseIntPipe) id: number){
        return {
            success: true,
            message: 'User retrieved successfully',
            data: this.usersService.getUser(id),
        }
    }

    @Post()
    createUser(@Body() body: CreateUserDto){
        return {
            success: true,
            message: 'User retrieved successfully',
            data: body  
        }
    }
}
