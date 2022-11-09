import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class AppService {
  constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
  }

  async findOne(condition:any): Promise<User>{
    return await this.userRepository.findOne({where:condition});
  }
}
