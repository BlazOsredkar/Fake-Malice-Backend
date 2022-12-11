import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {Meni} from "./entities/meniji.entity";

@Injectable()
export class AppService {
  constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>,
      @InjectRepository(Meni) private readonly meniRepository: Repository<Meni>
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
}
