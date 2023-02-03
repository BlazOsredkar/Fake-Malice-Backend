import {forwardRef, Module} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Kraj} from "../entities/kraji.entity";
import {UserModule} from "../user/user.module";
import {CommonModule} from "../common/common.module";

@Module({
  imports: [forwardRef(()=> UserModule),CommonModule,TypeOrmModule.forFeature([Kraj])],
  providers: [CitiesService],
  controllers: [CitiesController],
  exports: [CitiesService]
})
export class CitiesModule {}
