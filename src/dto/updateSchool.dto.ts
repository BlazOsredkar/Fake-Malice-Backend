import {IsOptional, IsString} from "class-validator";


export class UpdateSchoolDto {

    @IsOptional()
    @IsString()
    ime: string;

    @IsOptional()
    @IsString()
    kratica: string;
}