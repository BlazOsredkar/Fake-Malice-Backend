import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {User} from "./user.entity";
import {JwtModule} from "@nestjs/jwt";
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
      ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'fake-malice',
      entities: [User],
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
