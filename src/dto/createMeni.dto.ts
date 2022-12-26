import {IsNotEmpty, IsOptional} from "class-validator";

export class CreateMeniDto {

    @IsOptional()
    opis: string;

    @IsNotEmpty()
    vrstaMenija: number;

    @IsNotEmpty()
    datum: Date;
}