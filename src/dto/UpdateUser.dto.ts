import {IsEmail, IsNotEmpty, IsOptional} from "class-validator";
import {Spol} from "../entities/spol.entity";
import {Kraj} from "../entities/kraji.entity";
import {Razred} from "../entities/razredi.entity";



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

    @IsOptional()
    stanjerac: number;

    spol:any;
    razred:any;
    kraj:any;

}