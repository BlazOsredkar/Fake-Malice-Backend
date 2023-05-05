import {IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional} from "class-validator";

export class OrderMeniDto {
    @IsNotEmpty()
    @IsNumber()
    meni: number

    @IsNotEmpty()
    @IsDateString()
    datum: Date
}