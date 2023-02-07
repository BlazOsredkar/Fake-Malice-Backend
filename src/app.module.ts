import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MeniModule } from './meni/meni.module';
import { CommonModule } from './common/common.module';
import {PozabljenoGesloEntity} from "./entities/pozabljeno-geslo.entity";
import { UserModule } from './user/user.module';
import {MailerModule} from "@nestjs-modules/mailer";
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import {EjsAdapter} from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";
import { CitiesModule } from './cities/cities.module';
import { ClassesModule } from './classes/classes.module';
import { SchoolModule } from './school/school.module';


@Module({
  imports: [
      ConfigModule.forRoot({isGlobal:true}),
      MailerModule.forRoot({
          transport: {
              host: process.env.MAIL_HOST,
              port: 465,
              secure: true,
              auth: {
                  user: process.env.MAIL_USER,
                  pass: process.env.MAIL_PASS,
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
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),

      MeniModule,
      CommonModule,
      UserModule,
      CitiesModule,
      ClassesModule,
      SchoolModule,

  ],
})
export class AppModule {}


