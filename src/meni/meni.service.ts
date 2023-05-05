import {BadRequestException, Injectable} from '@nestjs/common';
import {Meni} from "../entities/meniji.entity";
import {VrstaMenija} from "../entities/vrste_menijev.entity";
import {DeleteResult, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {Narocilo} from "../entities/narocila.entity";
import {UserService} from "../user/user.service";
import {OrderMeniDto} from "../dto/orderMeni.dto";
import {Cron} from "@nestjs/schedule";
import {async} from "rxjs";

@Injectable()
export class MeniService {
    constructor(
        @InjectRepository(Meni) private readonly meniRepository: Repository<Meni>,
        @InjectRepository(VrstaMenija) private readonly vrstaMenijaRepository: Repository<VrstaMenija>,
        @InjectRepository(Narocilo) private readonly orderRepository: Repository<Narocilo>,
        private readonly userService: UserService,
    ) {
    }

    @Cron('59 0 23 * * *')
    async handleCron() {
        await this.removeUsersMoney();
    }

    @Cron('0 41 14 2 * *')
    async handleCronForMonth() {
        await this.fillMenusForNextMonth()
    }

    async removeUsersMoney() {
        const danasnjiDatum = new Date();
        danasnjiDatum.setHours(0,0,0,0);
        const narocila = await this.findOrders(danasnjiDatum);
        for (const narocilo of narocila)
        {
            if(narocilo.user)
            {
                await this.userService.removeMoney(narocilo.user)
            }
        }
    }

    async fillMenusForNextMonth() {
        const today = new Date();
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        const days = this.getDates(firstDay, lastDay);
        const vrsteMenijev = await this.vrsteMenijev();
        for (const day of days) {
            for (const vrstaMenija of vrsteMenijev) {
                if(vrstaMenija.ime === "Mesni meni" || vrstaMenija.ime === "Vegi meni" || vrstaMenija.ime === "Brez Malice") {
                    continue;
                }
                const meni = new Meni();
                meni.datum = day;
                meni.vrstaMenija = vrstaMenija;
                await this.createMeni(meni);
            }
        }
    }

    getDates(startDate, stopDate) {
        const dateArray = [];
        let currentDate:Date = startDate;
        while (currentDate <= stopDate){
            const isWeekend:boolean = currentDate.getDay() === 0 || currentDate.getDay() === 6;
            if(!isWeekend){
                dateArray.push(new Date (currentDate));
            }
            currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
        }
        return dateArray;
    }

    async createMeni(data: any): Promise<Meni>{
        return await this.meniRepository.save(data);
    }
    async vrsteMenijev(): Promise<VrstaMenija[]>{
        return await  this.vrstaMenijaRepository.find();
    }

    async deleteMeni(condition:any): Promise<DeleteResult>{
        return await this.meniRepository.delete(condition);
    }
    async findMeni(condition:any): Promise<Meni[]>{
        const menus = await this.meniRepository.find({where:condition})
        if(menus.length === 0) return [];
        const emptyMenu = new Meni();
        emptyMenu.id = 0;
        emptyMenu.opis  = "Brez malice";
        emptyMenu.datum = menus[0].datum;
        emptyMenu.vrstaMenija = await this.vrstaMenijaRepository.findOne({where: {ime: "Brez malice"}});
        menus.push(emptyMenu);
        return menus;
    }

    async updateMeni(id:number, data:any){
         return await this.meniRepository.update(id,{...data});
    }

    async orderMeni(id:number, userid:number,date:Date): Promise<string>{
        if(id === 0){
            await this.unorderMeni(date, userid);
            return "Meni odstranjen!";
        }
        const meni = await this.meniRepository.findOne({where: {id: id}});
        if(!meni) throw new BadRequestException('Meni ne obstaja!');
        const user = await this.userService.findOne({id: userid});
        if(!user) throw new BadRequestException('Uporabnik ne obstaja!');
        const Today = new Date();
        Today.setHours(0,0,0,0);
        if(meni.datum.getTime() === Today.getTime()) throw new BadRequestException('Meni ni na voljo!');
        const order = await this.findOrder(meni.datum, user.id)
        order.user = user;
        order.meni = meni;
        order.datum = new Date();

        await this.orderRepository.save(order);
        return "Meni naročen!";
    }

    async unorderMeni(datum:Date, userid:number){
        const date = new Date(datum)
        const order = await this.findOrder(date, userid);
        if(!order.id) throw new BadRequestException('Narocilo ne obstaja!')
        await this.orderRepository.delete(order.id);
    }



    async findOrder(date:Date, userId:number): Promise<Narocilo>{
        if(!date || !userId) return new Narocilo();
        const order = await this.orderRepository.findOne({where: {meni: {datum: date}, user: {id: userId}}});
        if(order) return order;
        return new Narocilo();
    }

    async findOrders(date:Date): Promise<Narocilo[]>{
        if(!date) return [];
        const order = await this.orderRepository.find({where: {meni: {datum: date}}});
        if(order) return order;
        return [];
    }

    async getOrderedMeni(userId: number, datum:Date) {
        const order = await this.findOrder(datum, userId);
        if(!order){
            return 0;
        }
        if (!order.meni) {
            return 0;
        }
        return order.meni.id;
    }
}
