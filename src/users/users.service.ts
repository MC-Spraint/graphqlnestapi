import { Injectable } from "@nestjs/common";
import { CreateUserInput } from "./dto/input/create-user.input";
import { User } from "./models/user";
import { v4 as uuidv4 } from "uuid";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { GetUserArgs } from "./dto/args/get-user.args";
import { GetUsersArgs } from "./dto/args/get-users.args";
import { DeleteUserInput } from "./dto/input/delete-user.input";

@Injectable()
export class UsersService{
    private users: User[] = [];

    public createUser(createUserInput: CreateUserInput) :User{
        const user: User = {
            userId: uuidv4(),
            ...createUserInput
        }
        this.users.push(user);
        return user;
    }

    public updateUser(updateUserInput: UpdateUserInput): User{
        const user = this.users.find(user => user.userId === updateUserInput.userId);
        Object.assign(user, updateUserInput);
        return user;
    }

    public getUser(getUserArgs: GetUserArgs): User{
        return this.users.find(user => user.userId === getUserArgs.userId)
    }

    public getUsers(getUsersArgs: GetUsersArgs): User[]{
        return getUsersArgs.userIds.map(userId => this.getUser({userId}))
    }
    
    public deleteUser(deleteUserInput: DeleteUserInput): User{
        const userIndex = this.users.findIndex(user => user.userId === deleteUserInput.userId);
        const user = this.users[userIndex];
        this.users.splice(userIndex);
        return user;
    }
}