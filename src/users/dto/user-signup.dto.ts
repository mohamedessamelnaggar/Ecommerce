import { Injectable } from "@nestjs/common";
import {IsNotEmpty,IsEmail,IsString,MinLength} from "class-validator";
import { UserSignInDto } from "./user-signin.dto";


@Injectable()
export class UserSignUpDto extends UserSignInDto {

    @IsNotEmpty({message : "Not Empty"})
    @IsString({message : "Should Be string"})
    name:string ;

    @IsNotEmpty({message : "Not Empty"})
    @IsString({message : "Should Be string"})
    email : string;

    @IsNotEmpty({message : "Not Empty"})
    @MinLength(5,{message:"min 5 character"})
    password:string;
}