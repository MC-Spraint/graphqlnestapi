import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsEmail, IsOptional } from "class-validator";

@InputType()
export class UpdateUserInput{
    @Field()
    @IsNotEmpty()
    userId: string;

    @Field()
    @IsNotEmpty()
    @IsOptional()
    age?: number;

    @Field({nullable: true})
    @IsOptional()
    isOnline?: boolean;
}