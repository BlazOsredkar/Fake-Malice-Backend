import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
    Req,
    Res,
    UnauthorizedException, UseGuards
} from '@nestjs/common';
import {Request, Response} from "express";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "./user.service";
import {LoginUserDto} from "../dto/loginUser.dto";
import * as bcrypt from "bcrypt";
import {AdminGuard} from "../admin/admin.guard";
import {RegisterUserDto} from "../dto/registerUser.dto";
import {ForgotPasswordDto} from "../dto/forgotPassword.dto";
import {MailerService} from "@nestjs-modules/mailer";
import { v4 as uuidv4 } from 'uuid';
import {PozabljenoGesloEntity} from "../entities/pozabljeno-geslo.entity";
import {ResetPasswordDto} from "../dto/resetPassword.dto";
import * as userAgent from 'useragent';

@Controller('/api/user')
export class UserController {
    private readonly cookieOptions = {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 ,
    }
    constructor(private readonly jwtService: JwtService, private  readonly userService:UserService, private readonly mailerService: MailerService) {}

    @Get()
    async user(@Req() request: Request) {
        try {
            const cookie = request.cookies['jwt'];

            const data = await this.jwtService.verifyAsync(cookie);

            if (!data) {
                throw new UnauthorizedException();
            }

            const user = await this.userService.findOne({id: data['id']})

            const {geslo, ...result} = user;

            return result;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Post('login')
    @HttpCode(200)
    async login(
        @Body() body: LoginUserDto,
        @Res({passthrough: true}) response: Response,
    ) {
        const user = await this.userService.findOne({eposta: body.eposta});

        if (!user) {
            throw new BadRequestException('Neveljavni podatki za prijavo');
        }

        if (!await bcrypt.compare(body.geslo, user.geslo)) {
            throw new BadRequestException('Neveljavni podatki za prijavo');
        }

        const jwt = await this.jwtService.signAsync({id: user.id});

        response.cookie('jwt', jwt, this.cookieOptions);

        return {
            message: 'Uspeh!',

        };


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

        const user = await this.userService.findOne([{eposta: body.eposta}, {emso: body.emso}]);
        if(user?.eposta === body.eposta && user?.emso === body.emso){
            throw new BadRequestException('Uporabnik z to epošto in emšo že obstaja!');
        }
        if (user?.eposta === body?.eposta) {
            throw new BadRequestException('Epošta že obstaja!');
        }
        if (user?.emso === body?.emso) {
            throw new BadRequestException('EMŠO že obstaja!');
        }

        const hash = await bcrypt.hash(body.geslo, 10);
        const {geslo, ...data} = await this.userService.create({...body, geslo: hash});

        return data;


    }





    @Post('forgotPassword')
    @HttpCode(200)
    async forgotPassword(
        @Body() body: ForgotPasswordDto,
        @Req() request: Request,

    ) {

        const userAgentString = request.headers['user-agent'];
        const userAgentInfo = userAgent.parse(userAgentString);
        const userIP = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
        console.log(userIP);

        const user = await this.userService.findOne({eposta: body.eposta});
        if (!user) {
            throw new BadRequestException('Uporabnik ne obstaja!');
        }
        const token = await this.userService.createPozabljenoGeslo(user);
        const link = `http://localhost:3000/reset-password?token=${token}`;
        await this.mailerService.sendMail({
            to: body.eposta,
            subject: 'Reset Password',
            context: { link, ime:user.ime, priimek:user.priimek, userSource: userAgentInfo.source, userOs: userAgentInfo.os.toString(), userBrowser: userAgentInfo.family, userDevice: userAgentInfo.device.toString() },
            template: 'resetPassword.ejs',

        });
    }

    @Post('resetPassword')
    @HttpCode(200)
    async resetPassword(
        @Body() body: ResetPasswordDto,
    ) {
        return await this.userService.resetPassword(body);
    }
}
