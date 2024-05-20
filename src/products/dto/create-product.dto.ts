import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";


export class CreateProductDto {

    @IsNotEmpty({message: "title cannot be empty"})
    @IsString()
    title: string;

    @IsNotEmpty({message: "description cannot be empty"})
    @IsString()
    description: string;

    @IsNotEmpty({message :"Price cannot be empty"})
    @IsNumber({maxDecimalPlaces: 2 }, {message: "price should be a number & max decimal precision 2 "})
    @IsPositive({message: "price should be positive number"})
    price: number;

    @IsNotEmpty({message : "stock cannot be empty"})
    @IsNumber({} , {message: "stock should be number"})
    @Min(0,{message: "stock cannot be negative number"})
    stock: number;

    @IsNotEmpty({message:"images  cannot be empty"})
    @IsArray({message: "images should be in array format"})
    images:string[];

    @IsNotEmpty({message: "category cannot be empty"})
    @IsNumber({},{message: "category should be a number"})
    categoryId:number;
}
