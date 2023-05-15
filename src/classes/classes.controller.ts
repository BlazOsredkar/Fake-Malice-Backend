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



}
