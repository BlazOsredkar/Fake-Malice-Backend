import { Module } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassesController } from './classes.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Razred} from "../entities/razredi.entity";
import {UserService} from "../user/user.service";
import {UserModule} from "../user/user.module";
import {CommonModule} from "../common/common.module";

@Module({
  imports: [UserModule,CommonModule,TypeOrmModule.forFeature([Razred])],
  providers: [ClassesService],
  controllers: [ClassesController]
})
export class ClassesModule {}
