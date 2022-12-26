import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {User} from "./entities/user.entity";
import {JwtModule, JwtService} from "@nestjs/jwt";
import { ConfigModule } from '@nestjs/config';
import {Sola} from "./entities/sole.entity";
import {Razred} from "./entities/razredi.entity";
import {Meni} from "./entities/meniji.entity";
import {VrstaMenija} from "./entities/vrste_menijev.entity";
import {Narocilo} from "./entities/narocila.entity";
import {Kraj} from "./entities/kraji.entity";
import { MeniModule } from './meni/meni.module';
import { CommonModule } from './common/common.module';


@Module({
  imports: [
      ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
      TypeOrmModule.forFeature([User, Sola, Razred, Narocilo,Kraj]),
      MeniModule,
      CommonModule,

  ],

  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}


