import {forwardRef, Module} from '@nestjs/common';
import { MeniController } from './meni.controller';
import { MeniService } from './meni.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {Sola} from "../entities/sole.entity";
import {Razred} from "../entities/razredi.entity";
import {Meni} from "../entities/meniji.entity";
import {VrstaMenija} from "../entities/vrste_menijev.entity";
import {Narocilo} from "../entities/narocila.entity";
import {Kraj} from "../entities/kraji.entity";
import {AppModule} from "../app.module";
import {CommonModule} from "../common/common.module";
import {UserModule} from "../user/user.module";


@Module({
  controllers: [MeniController],
  providers: [MeniService],

  imports: [
    forwardRef(() => AppModule),
      CommonModule,
    TypeOrmModule.forFeature([Meni, VrstaMenija]),
      UserModule
  ],
    exports: [MeniService]
})
export class MeniModule {}

//