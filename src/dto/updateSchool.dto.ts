import {Optional} from "@nestjs/common";


export class UpdateSchoolDto {

    @Optional()
    ime: string;

    @Optional()
    kratica: string;
}