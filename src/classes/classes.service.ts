import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Razred} from "../entities/razredi.entity";
import {Repository} from "typeorm";
import {UpdateUserDto} from "../dto/UpdateUser.dto";

@Injectable()
export class ClassesService {
    constructor(@InjectRepository(Razred) private readonly razredRepository: Repository<Razred>) {

    }

    findAll() {
        return this.razredRepository.find();
    }


    async delete(id: number) {
        if (!id)
            throw new BadRequestException('Invalid id');
        return await this.razredRepository.delete(id);
    }

    async update(id: number, body: UpdateUserDto) {
        return Promise.resolve(undefined);
    }


    async findOne(param: { id: number }) {


    }
}
