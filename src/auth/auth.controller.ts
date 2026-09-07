import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto, RegisterDto } from './dto/register.dto.js';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }


    @Post("register")
   async register(@Body() body: RegisterDto){
        const result = await this.authService.register(
            body.name,
            body.email,
            body.password
        )

        return {
            success: true,
            message: "User registred successfully",
            data: result
        }
    }

    @Post("login")
   async login(@Body() body: LoginDto) {

        const result = await this.authService.login(
            body.email,
            body.password
        )

        return {
            success: true,
            messege: "Login successfully",
            data: result
        }
    }
}
