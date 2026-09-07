import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [

        JwtModule.registerAsync({
            imports: [ConfigModule],

            inject: [ConfigService],

            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>("JWT_SECRET"),
                signOptions: {
                    expiresIn: '1d',
                }
            })
        })
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule { }
