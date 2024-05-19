import { Injectable } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";

@Injectable()
export class CreateCategoryDto {

    @IsNotEmpty({message : "Not Empty"})
    @IsString({message : "Should Be string"})
    title: string;

    @IsNotEmpty({message : "Not Empty"})
    @IsString({message : "Should Be string"})
    description: string;
}
