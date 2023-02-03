import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Sola} from "../entities/sole.entity";
import {UserModule} from "../user/user.module";
import {CommonModule} from "../common/common.module";

@Module({
  imports: [UserModule,CommonModule,TypeOrmModule.forFeature([Sola])],
  providers: [SchoolService],
  controllers: [SchoolController]
})
export class SchoolModule {}
