import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {DeleteResult, Repository} from "typeorm";
import {Meni} from "./entities/meniji.entity";
import {VrstaMenija} from "./entities/vrste_menijev.entity";

@Injectable()
export class AppService {
  constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>,
      @InjectRepository(Meni) private readonly meniRepository: Repository<Meni>,
      @InjectRepository(VrstaMenija) private readonly vrstaMenijaRepository: Repository<VrstaMenija>,
  ) {
  }

  async findOne(condition:any): Promise<User>{
    return await this.userRepository.findOne({where:condition});
  }

  async create(data: any): Promise<User>{
    return await this.userRepository.save(data);
  }

  async findMeni(condition:any): Promise<Meni[]>{
    return await this.meniRepository.find({where:condition});
  }

  async forgotPassword(data: any): Promise<User[]>{
    return await this.userRepository.find(data);
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


}
