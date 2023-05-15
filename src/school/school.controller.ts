import {BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Put, Req, UseGuards} from '@nestjs/common';
import {SchoolService} from "./school.service";
import {AdminGuard} from "../admin/admin.guard";
import {Request} from "express";
import {UpdateUserDto} from "../dto/UpdateUser.dto";
import {UpdateSchoolDto} from "../dto/updateSchool.dto";

@Controller('api/school')
export class SchoolController {
    constructor(private readonly schoolService: SchoolService) {}


    @UseGuards(AdminGuard)
    @Get('all')
    async all() {
        return this.schoolService.findAll();
    }



}
