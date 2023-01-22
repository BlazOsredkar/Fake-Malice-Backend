import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import {PozabljenoGesloEntity} from "./entities/pozabljeno-geslo.entity";
import { UserModule } from './user/user.module';
import {MailerModule} from "@nestjs-modules/mailer";
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import {EjsAdapter} from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";


@Module({
  imports: [
      ConfigModule.forRoot({isGlobal:true}),
      MailerModule.forRoot({
          transport: {
              host: 'malice.vrtogo.si',
              port: 465,
              secure: true,
              auth: {
                  user: 'info@malice.vrtogo.si',
                  pass: 'Geslo2022!',
              },
              path: '/mail/',
          },
          defaults: {
              from:'"Podpora - Malice" <info@malice.vrtogo.si>',
          },
          template: {
              dir: process.cwd() + '/src/mail/',
              adapter: new EjsAdapter(),
              options: {
                  strict: false,
              },
          },
         }),
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

      TypeOrmModule.forFeature([Sola, Razred, Narocilo,Kraj]),
      MeniModule,
      CommonModule,
      UserModule,

  ],
})
export class AppModule {}


