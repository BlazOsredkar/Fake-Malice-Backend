import {
    BadRequestException,
    Body,
    Controller,
    Get, HttpCode,
    HttpStatus,
    Post, Query,
    Req,
    Res,
    UnauthorizedException, UseGuards, UseInterceptors
} from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from "express";
import {LoginUserDto} from "./dto/loginUser.dto";
import {RegisterUserDto} from "./dto/registerUser.dto";
import {AdminGuard} from "./admin/admin.guard";
import {UserGuard} from "./user/user.guard";
import {ForgotPasswordDto} from "./dto/forgotPassword.dto";
import {CreateMeniDto} from "./dto/createMeni.dto";



@Controller('api')
export class AppController {
    private readonly cookieOptions = {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 ,
    }
    constructor(private readonly appService: AppService,
                private jwtService: JwtService) {

    }


    @Post('login')
    @HttpCode(200)
    async login(
        @Body() body: LoginUserDto,
        @Res({passthrough: true}) response: Response,
    ) {
        const user = await this.appService.findOne({eposta: body.eposta});

        if (!user) {
            throw new BadRequestException('Neveljavni podatki za prijavo');
        }
        //console.log(user, body.geslo);

        if (!await bcrypt.compare(body.geslo, user.geslo)) {
            throw new BadRequestException('Neveljavni podatki za prijavo');
        }

        const jwt = await this.jwtService.signAsync({id: user.id});

        response.cookie('jwt', jwt, this.cookieOptions);

        return {
            message: 'Uspeh!',

        };


    }

    @Get('user')
    async user(@Req() request: Request) {
        try {
            const cookie = request.cookies['jwt'];

            const data = await this.jwtService.verifyAsync(cookie);

            if (!data) {
                throw new UnauthorizedException();
            }

            const user = await this.appService.findOne({id: data['id']})

            const {geslo, ...result} = user;

            return result;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Post('logout')
    @HttpCode(200)
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt', this.cookieOptions);

        return {
            message: 'Uspešna odjava!'
        }
    }

    @UseGuards(AdminGuard)
    @Post('register')

    @HttpCode(200)
    async register(
        @Body() body: RegisterUserDto,
    ) {
        const user = await this.appService.findOne({eposta: body.eposta, emso: body.emso});
        if (user) {
            throw new BadRequestException('Uporabnik že obstaja!');
        }
        const hash = await bcrypt.hash(body.geslo, 10);
        const {geslo, ...data} = await this.appService.create({...body, geslo: hash});

        return data;


    }


    @Get('meni')
    @UseGuards(UserGuard)
    async meni(@Query('datum') datum: string) {

        if (!datum) {
            throw new BadRequestException('Datum je obvezen parameter!');
        }

        try {
            const date = new Date(datum);
            date.setHours(0, 0, 0, 0);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (date < today) {
                throw new BadRequestException('Datum mora biti v prihodnosti!');
            }
            return this.appService.findMeni({datum: date});
        } catch (e) {
            throw new BadRequestException('Datum je v napačnem formatu!');
        }


    }


    @Post('forgotPassword')
    @HttpCode(200)
    async forgotPassword(
        @Body() body: ForgotPasswordDto,
    ) {

        const user = await this.appService.findOne({eposta: body.eposta});
        if (!user) {
            throw new BadRequestException('Uporabnik ne obstaja!');
        }
        return user;
    }

    @Post('createMeni')
    @UseGuards(AdminGuard)
    @HttpCode(200)
    async createMeni(
        @Body() body: CreateMeniDto,
    ) {

        const meni = await this.appService.createMeni(body);
        return meni;

    }

    @Get('vrsteMenijev')
    @UseGuards(UserGuard)
    async vrsteMenijev() {
        return this.appService.vrsteMenijev();
    }



}
