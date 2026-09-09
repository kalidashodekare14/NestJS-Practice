import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

    constructor(
        private readonly configService: ConfigService,
        private readonly prisma: PrismaService
    ) { }

    async getUsers() {
        return await this.prisma.user.findMany();
    }

    async deleteUser(id: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                id
            }
        })

        if (!user) {
            throw new NotFoundException("User not found");
        }

        await this.prisma.user.delete({
            where: {
                id
            }
        })

        return user;

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

    async getProfile(userId: any) {
        const profile = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        return profile
    }

    async updateProfile(userId: string, data: UpdateUserDto) {
        const updateData: {
            name?: string,
            password?: string
        } = {}

        if (data.name) {
            updateData.name = data.name
        }

        if (data.password) {
            updateData.password = await bcrypt.hash(data.password, 14)
        }

        const user = await this.prisma.user.update({
            where: {
                id: userId
            },
            data: updateData,
            omit: {
                password: true
            }
        })

        return user
    }

    getConfig() {
        return {
            port: this.configService.get<number>('PORT'),
            jwtSecret: this.configService.get<string>('JWT_SECRET')
        }
    }
}
