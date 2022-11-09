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
import {LoginUserDto} from "./dto/loginUser.dto";


@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService,
              private jwtService: JwtService) {}

  @Post('login')
  @HttpCode(200)
  async login(
      @Body() body: LoginUserDto,
      @Res({passthrough:true}) response: Response,
  ) {
      const user = await this.appService.findOne({eposta: body.eposta});

      if(!user){
        throw new BadRequestException('Neveljavni podatki za prijavo');
      }
      console.log(user, body.geslo);

      if(!await bcrypt.compare(body.geslo , user.geslo)){
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

          const {geslo, ...result} = user;

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
