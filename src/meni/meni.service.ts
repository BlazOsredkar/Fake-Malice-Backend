import { Injectable } from '@nestjs/common';
import {Meni} from "../entities/meniji.entity";
import {VrstaMenija} from "../entities/vrste_menijev.entity";
import {DeleteResult, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";

@Injectable()
export class MeniService {
    constructor(
        @InjectRepository(Meni) private readonly meniRepository: Repository<Meni>,
        @InjectRepository(VrstaMenija) private readonly vrstaMenijaRepository: Repository<VrstaMenija>,
    ) {
    }
    async createMeni(data: any): Promise<Meni>{
        return await this.meniRepository.save(data);
    }
    async vrsteMenijev(): Promise<VrstaMenija[]>{
        return await  this.vrstaMenijaRepository.find();
    }

    async deleteMeni(condition:any): Promise<DeleteResult>{
        return await this.meniRepository.delete(condition);
    }
    async findMeni(condition:any): Promise<Meni[]>{
        return await this.meniRepository.find({where:condition});
    }

    async updateMeni(id:number, data:any){
         return await this.meniRepository.update(id,{...data});
    }
}
