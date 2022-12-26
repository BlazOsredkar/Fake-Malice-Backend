import {IsNotEmpty} from "class-validator";

export class DeleteMeniDto {
    @IsNotEmpty()
    id: number;
}

