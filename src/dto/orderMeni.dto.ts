import {IsNotEmpty, IsNumber} from "class-validator";

export class OrderMeniDto {
    @IsNotEmpty()
    @IsNumber()
    meni: number
}