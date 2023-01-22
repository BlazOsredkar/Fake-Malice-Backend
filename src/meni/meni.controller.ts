import {BadRequestException, Body, Controller, Delete, Get, HttpCode, Post, Query, UseGuards} from '@nestjs/common';
import {UserGuard} from "../user/user.guard";
import {AdminGuard} from "../admin/admin.guard";
import {CreateMeniDto} from "../dto/createMeni.dto";
import {DeleteMeniDto} from "../dto/deleteMeni.dto";
import {MeniService} from "./meni.service";
import {UpdateMeniDto} from "../dto/UpdateMeni.dto";

@Controller('/api/meni')
export class MeniController {

    constructor(private readonly MeniService: MeniService) {

    }



    @Get()
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
            return this.MeniService.findMeni({datum: date});
        } catch (e) {
            throw new BadRequestException('Datum je v napačnem formatu!');
        }


    }

    @Post('create')
    @UseGuards(AdminGuard)
    @HttpCode(200)
    async createMeni(
        @Body() body: CreateMeniDto,
    ) {

        const meni = await this.MeniService.createMeni(body);
        return meni;

    }

    @Get('vrste')
    @UseGuards(UserGuard)
    async vrsteMenijev() {
        return this.MeniService.vrsteMenijev();
    }

    @Delete('delete')
    @UseGuards(AdminGuard)
    @HttpCode(200)
    async deleteMeni(
        @Body() body: DeleteMeniDto,
    ) {
        const meni = await this.MeniService.deleteMeni({id: body.id});
        return meni;
    }

    @Post('update')
    @UseGuards(AdminGuard)
    @HttpCode(200)
    async updateMeni(
        @Body() body: UpdateMeniDto,
    ) {
        const meni = await this.MeniService.updateMeni(body.id, body);
        return meni;
    }
    
    
}
