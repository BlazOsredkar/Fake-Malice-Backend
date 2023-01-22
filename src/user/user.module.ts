import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {CommonModule} from "../common/common.module";
import {PozabljenoGesloEntity} from "../entities/pozabljeno-geslo.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, PozabljenoGesloEntity]), CommonModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
