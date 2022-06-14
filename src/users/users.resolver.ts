import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { GetUserArgs } from "./dto/args/get-user.args";
import { GetUsersArgs } from "./dto/args/get-users.args";
import { CreateUserInput } from "./dto/input/create-user.input";
import { DeleteUserInput } from "./dto/input/delete-user.input";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { User } from "./models/user";
import { UsersService } from "./users.service";

@Resolver(()=>User)
export class UsersResolver{
    constructor(private readonly _usersService: UsersService){}

    @Query(()=>User, {name: "user", nullable: true})
    getUser(@Args() getUserArgs: GetUserArgs): User{
        return this._usersService.getUser(getUserArgs);
    }
    @Query(()=>[User], {name: "users", nullable: "items"})
    getUsers(@Args() getUsersArgs: GetUsersArgs): User[]{
        return this._usersService.getUsers(getUsersArgs);
    }
    @Mutation(()=>User)
    createUser(@Args("createUserInput") createUserInput: CreateUserInput): User {
        return this._usersService.createUser(createUserInput);
    }
    @Mutation(()=>User)
    updateUser(@Args("updateUserInput") updateUserInput: UpdateUserInput): User {
        return this._usersService.updateUser(updateUserInput);
    }
    @Mutation(()=>User)
    deleteUser(@Args("deleteUserInput") deleteUserInput: DeleteUserInput): User {
        return this._usersService.deleteUser(deleteUserInput);
    }
    
}