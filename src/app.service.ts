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
  ) {
  }

  async findOne(condition:any): Promise<User>{
    return await this.userRepository.findOne({where:condition});
  }

  async create(data: any): Promise<User>{
    return await this.userRepository.save(data);
  }

  async forgotPassword(data: any): Promise<User[]>{
    return await this.userRepository.find(data);
  }



}
