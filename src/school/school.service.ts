import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Sola} from "../entities/sole.entity";
import {Repository} from "typeorm";
import {UpdateSchoolDto} from "../dto/updateSchool.dto";

@Injectable()
export class SchoolService {
    constructor(@InjectRepository(Sola) private readonly schoolRepository: Repository<Sola>) {

    }

    findAll() {
        return this.schoolRepository.find();
    }

    async delete(id: number) {
        if (!id)
            throw new BadRequestException('Invalid id');
        return await this.schoolRepository.delete(id);

    }

    async update(id: number, data: UpdateSchoolDto) {
        if (!id)
            throw new BadRequestException('Invalid id');
        if (!data)
            throw new BadRequestException('Invalid data');
        return await this.schoolRepository.update(id, data);
    }
}
