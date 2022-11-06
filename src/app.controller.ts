import {
    BadRequestException,
    Body,
    Controller,
    Get, HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UnauthorizedException
} from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from "express";


@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService,
              private jwtService: JwtService) {}

  @Post('login')
  @HttpCode(200)
  async login(
      @Body('email') email: string,
      @Body('password') password: string,
      @Res({passthrough:true}) response: Response,
  ) {
      const user = await this.appService.findOne({email});
      if(!user){
        throw new BadRequestException('Neveljavni podatki za prijavo');
      }

      if(!await bcrypt.compare(password, user.password)){
          throw new BadRequestException('Neveljavni podatki za prijavo');
      }

      const jwt = await this.jwtService.signAsync({id: user.id});

      response.cookie('jwt', jwt, {httpOnly:true});

      return {
          message: 'Uspeh!'
      };


  }
  @Get('user')
  async user(@Req() request: Request ){
      try {
          const cookie = request.cookies['jwt'];

          const data = await this.jwtService.verifyAsync(cookie);

          if(!data){
              throw new UnauthorizedException();
          }

          const user = await this.appService.findOne({id: data['id']})

          const {password, ...result} = user;

          return result;
      }catch (e){
          throw new UnauthorizedException();
      }
  }

  @Post('logout')
  async logout(@Res({passthrough:true}) response: Response){
      response.clearCookie('jwt');

      return{
          message: 'Uspešna odjava!'
      }
  }
}
