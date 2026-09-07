import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ) { }

    async register(name: string, email: string, password: string) {
        const hashPassword = await bcrypt.hash(password, 14);

        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword
            },
            omit: {
                password: true
            }
        })

        return user;
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                email
            }
        })

        if(!user){
            throw new UnauthorizedException('Invalid email or password')
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            throw new UnauthorizedException("Invalid email and password");
        }

        const accessToken = await this.generateToken(
            user.id,
            user.email
        )

        return {
            accessToken
        }

    }

    generateToken(userId: string, email: string) {
        const payload = {
            sub: userId,
            email
        }

        return this.jwtService.sign(payload)
    }
}
