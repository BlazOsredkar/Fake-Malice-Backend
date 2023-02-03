import {Controller, Get, Post, UseGuards} from '@nestjs/common';
import {ClassesService} from "./classes.service";
import {AdminGuard} from "../admin/admin.guard";

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
