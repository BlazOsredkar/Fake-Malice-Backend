import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Kraj} from "../entities/kraji.entity";

@Injectable()
export class CitiesService {
    constructor(@InjectRepository(Kraj) private readonly krajRepository: Repository<Kraj>) {
    }

    findAll() {
        return this.krajRepository.find();
    }

    async findOneByNameAndPostnaSt(postnaSt: number, kraj: string) {
        if(!postnaSt || !kraj) return null;
        return await this.krajRepository.findOne({ where: { postnaStevilka: postnaSt } });
    }
}
