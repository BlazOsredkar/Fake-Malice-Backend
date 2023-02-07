import {IsEmail, IsNotEmpty, IsOptional} from "class-validator";



export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    eposta: string;

    @IsOptional()
    geslo: string;

    @IsOptional()
    ime: string;

    @IsOptional()
    priimek: string;

    @IsOptional()
    telefon: string;

    @IsOptional()
    emso: number;

    @IsOptional()
    davcna: number;

    @IsOptional()
    datumroj: string;


    @IsOptional()
    razredID: number;

    @IsOptional()
    krajID: number;

    @IsOptional()
    spolID: number;




}