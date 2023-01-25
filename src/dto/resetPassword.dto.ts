import {IsNotEmpty} from "class-validator";

export class ResetPasswordDto {

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    geslo: string;

    @IsNotEmpty()
    ponovnoGeslo: string;

    @IsNotEmpty()
    token: string;

}