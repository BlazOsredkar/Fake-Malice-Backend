import {IsEmail, IsNotEmpty} from "class-validator";


export class RegisterUserDto {
    @IsNotEmpty({message: "Podatek EMAIL manjka"})
    @IsEmail({}, {message: "Podatek EMAIL ni v pravilni obliki"})
    eposta: string;

    @IsNotEmpty({message: "Podatek GESLO manjka"})
    geslo: string;

    @IsNotEmpty({message: "Podatek IME manjka"})
    ime: string;

    @IsNotEmpty({message: "Podatek PRIIMEK manjka"})
    priimek: string;

    @IsNotEmpty({message: "Podatek TELEFON manjka"})
    telefon: string;

    @IsNotEmpty({message: "Podatek EMŠO manjka"})
    emso: number;

    @IsNotEmpty({message: "Podatek DATUM ROJSTVA manjka"})
    datumroj: string;

    @IsNotEmpty({message: "Podatek KRAJ manjka"})
    kraj:string;

    @IsNotEmpty({message: "Podatek SPOL manjka"})
    spol:string;

    @IsNotEmpty({message: "Podatek RAZRED manjka"})
    razred:string;



}