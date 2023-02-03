import {forwardRef, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {CommonModule} from "../common/common.module";
import {PozabljenoGesloEntity} from "../entities/pozabljeno-geslo.entity";
import {Spol} from "../entities/spol.entity";
import {CitiesModule} from "../cities/cities.module";

@Module({
  imports: [CitiesModule,TypeOrmModule.forFeature([User, PozabljenoGesloEntity, Spol]), CommonModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
