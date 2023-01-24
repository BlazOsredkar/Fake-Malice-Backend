import {IsNotEmpty} from "class-validator";

export class ResetPasswordDto {
    @IsNotEmpty()
    geslo: string;

    @IsNotEmpty()
    ponovnoGeslo: string;

    @IsNotEmpty()
    token: string;

}