import {IsNotEmpty} from "class-validator";

export class CreateMeniDto {

    @IsNotEmpty()
    opis: string;

    @IsNotEmpty()
    vrstaMenija: number;

    @IsNotEmpty()
    datum: Date;
}