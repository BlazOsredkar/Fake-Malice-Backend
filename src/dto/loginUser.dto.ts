import {IsEmail, IsNotEmpty} from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    eposta: string;

    @IsNotEmpty()
    geslo: string;
}