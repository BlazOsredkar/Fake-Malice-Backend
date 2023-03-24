import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UseGuards
} from '@nestjs/common';
import {ClassesService} from "./classes.service";
import {AdminGuard} from "../admin/admin.guard";
import {UpdateUserDto} from "../dto/UpdateUser.dto";

@Controller('api/classes')
export class ClassesController {
    constructor(private readonly classesService: ClassesService) {
    }

    @Get('all')
    @UseGuards(AdminGuard)
    async all() {
        return this.classesService.findAll();
    }

    @UseGuards(AdminGuard)
    @Delete('/delete/:id')
    @HttpCode(200)
    async delete(@Param('id') id: number) {
        return await this.classesService.delete(id);
    }

    @UseGuards(AdminGuard)
    @Put('/update/:id')
    @HttpCode(200)
    async update(@Param('id') id: number, @Body() body: UpdateUserDto) {
        return await this.classesService.update(id, body);
    }



}
