import {IsDate, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";


export class UpdateMeniDto {

    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsOptional()
    @IsString()
    opis: string;

    @IsOptional()
    @IsNumber()
    vrstaMenija: number;

    @IsOptional()
    @IsDate()
    datum: Date;
}