import { Injectable } from "@nestjs/common";
import { IsNotEmpty, IsString, MinLength } from "class-validator";


@Injectable()
export class UserSignInDto {

    @IsNotEmpty({message : "Not Empty"})
    @IsString()
    email : string;

    @IsNotEmpty({message : "Not Empty"})
    @MinLength(5,{message:"min 5 character"})
    password:string;

}