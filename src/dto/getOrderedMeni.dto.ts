import {IsDate, IsNotEmpty, IsString} from "class-validator";

export class GetOrededMeniDto {
    @IsNotEmpty()
    @IsString()
    datum: string

}