import {Controller, Get} from '@nestjs/common';
import {CitiesService} from "./cities.service";

@Controller('api/cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) {

    }

    @Get('all')
    async all() {
        return this.citiesService.findAll();
    }

}
