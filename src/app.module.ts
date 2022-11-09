import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {User} from "./entities/user.entity";
import {JwtModule} from "@nestjs/jwt";
import { ConfigModule } from '@nestjs/config';
import {Sole} from "./entities/sole.entity";
import {Razredi} from "./entities/razredi.entity";

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
      entities: [User, Sole, Razredi],
      synchronize: true,
    }),
      TypeOrmModule.forFeature([User]),
      JwtModule.register({
        //TODO popravi secret
        secret:process.env.SECRET,
        signOptions: {expiresIn:'1d'}
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
