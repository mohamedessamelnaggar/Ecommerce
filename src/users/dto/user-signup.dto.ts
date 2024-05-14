import { Injectable } from "@nestjs/common";
import {IsNotEmpty,IsEmail,IsString,MinLength} from "class-validator";


@Injectable()
export class UserSignUpDto {

    @IsNotEmpty({message : "Not Empty"})
    @IsString()
    name:string ;

    @IsNotEmpty({message : "Not Empty"})
    @IsString()
    email : string;

    @IsNotEmpty({message : "Not Empty"})
    @MinLength(5,{message:"min 5 character"})
    password:string;
}