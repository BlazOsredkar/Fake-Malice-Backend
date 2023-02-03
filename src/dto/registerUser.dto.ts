import {IsEmail, IsNotEmpty} from "class-validator";


export class RegisterUserDto {
    @IsNotEmpty()
    @IsEmail()
    eposta: string;

    @IsNotEmpty()
    geslo: string;

    @IsNotEmpty()
    ime: string;

    @IsNotEmpty()
    priimek: string;

    @IsNotEmpty()
    telefon: string;

    @IsNotEmpty()
    emso: number;

    @IsNotEmpty()
    datumroj: string;

    @IsNotEmpty()
    kraj:string;




}