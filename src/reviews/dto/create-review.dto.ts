import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {
    @IsNotEmpty({message: " Product cannot be empty"})
    @IsNumber({}, {message: " Product Id must be a number "})
    ProductId: number;

    @IsNotEmpty({message: "ratings cannot be empty"})
    @IsNumber()
    ratings: number;

    @IsNotEmpty({message :"comment cannot be empty"})
    @IsString()
    comment: string;

   
}
