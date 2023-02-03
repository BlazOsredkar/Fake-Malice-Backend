import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Razred} from "../entities/razredi.entity";
import {Repository} from "typeorm";

@Injectable()
export class ClassesService {
    constructor(@InjectRepository(Razred) private readonly razredRepository: Repository<Razred>) {

    }

    findAll() {
        return this.razredRepository.find();
    }

    create() {

    }
}
