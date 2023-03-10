import {
    BadRequestException,
    Body,
    Controller, Delete,
    Get,
    HttpCode, Param,
    Post, Put,
    Req,
    Res,
    UnauthorizedException, UseGuards,
    forwardRef, Inject, HttpStatus
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
import {ResetPasswordDto} from "../dto/resetPassword.dto";
import * as userAgent from 'useragent';
import {compare} from "bcrypt";
import {UpdateUserDto} from "../dto/UpdateUser.dto";
import {CitiesService} from "../cities/cities.service";
import {validate} from "class-validator";

@Controller('/api/user')
export class UserController {
    private readonly cookieOptions = {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 ,
    }
    constructor(private readonly jwtService: JwtService,
                private  readonly userService:UserService,
                private readonly mailerService: MailerService,
        @Inject(forwardRef(() => CitiesService))
        private citiesService: CitiesService,
    ) {}

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
        const errors = await validate(body);
        if (errors.length > 0) {
            const errorMessage = errors.map(error => {
                const constraints = Object.values(error.constraints).join(', ');
                return `${error.property} ${constraints}`;
            }).join(', ');
            throw new BadRequestException(errorMessage);
        }


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

        const razdeljenKraj = body.kraj.split(',');
        const kraj = await this.citiesService.findOneByNameAndPostnaSt(parseInt(razdeljenKraj[1].trim()), razdeljenKraj[0].trim());
        if(!kraj){
            throw new BadRequestException('Kraj ne obstaja!');
        }

        const hash = await bcrypt.hash(body.geslo, 10);
        const {geslo, ...data} = await this.userService.create({...body, geslo: hash,kraj: {id: kraj.id}});

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

        const api = 'http://localhost:3000/';
        //const api = 'https://malice.vrtogo.si/';

        const user = await this.userService.findOne({eposta: body.eposta});
        if (!user) {
            throw new BadRequestException('Uporabnik ne obstaja!');
        }
        const token = await this.userService.createPozabljenoGeslo(user);
        const link = `${api}password/reset?token=${token}&email=${user.eposta}`;
        console.log(link);
        await this.mailerService.sendMail({
            to: body.eposta,
            subject: 'Ponastavitev gesla',
            context: { link, ime:user.ime, priimek:user.priimek, userSource: userAgentInfo.source, userOs: userAgentInfo.os.toString(), userBrowser: userAgentInfo.family, userDevice: userAgentInfo.device.toString(), userIP: userIP},
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

    @UseGuards(AdminGuard)
    @Get('all')
    @HttpCode(200)
    async all(@Req() request: Request) {
        const all = await this.userService.findAll();
        for (let i = 0; i < all.length; i++) {
            delete all[i].geslo;
        }
        return all;
    }

    @UseGuards(AdminGuard)
    @Delete('/delete/:id')
    @HttpCode(200)
    async delete(@Param('id') id: number) {
        return await this.userService.delete(id);
    }

    @UseGuards(AdminGuard)
    @Put('/update/:id')
    @HttpCode(200)
    async update(@Param('id') id: number, @Body() body: UpdateUserDto) {
        return await this.userService.update(id, body);
    }

    @UseGuards(AdminGuard)
    @Get('/find/:id')
    @HttpCode(200)
    async find(@Param('id') id: number) {
        if (!id) {
            throw new BadRequestException('Napaka!');
        }
        const {geslo, ...user} = await this.userService.findOne({id: id});
        return user;

    }

    @UseGuards(AdminGuard)
    @Get('/spol')
    @HttpCode(200)
    async spol() {
        return await this.userService.spol();
    }
}
