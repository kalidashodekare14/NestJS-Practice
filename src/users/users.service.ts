import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {

    private users = [
        {
            id: 1,
            name: "Kalidash"
        },
        {
            id: 2,
            name: "Bijoy"
        }
    ]

    getUsers() {
        return this.users
    }

    getUser(id: number) {
        const user = this.users.find((user) => user.id === id);

        if(!user){
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
}
