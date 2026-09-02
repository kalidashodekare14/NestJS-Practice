import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {

    constructor(
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService
    ) { }

   async getUsers() {
        return await this.prisma.user.findMany();
    }

   async getUser(id: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                id 
            }
        });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        return user;
    }

    getProfile() {
        return {
            id: 1,
            name: "Kalidash Odekare",
            role: "USER"
        }
    }

    getConfig() {
        return {
            port: this.configService.get<number>('PORT'),
            jwtSecret: this.configService.get<string>('JWT_SECRET')
        }
    }
}
