import {BadRequestException, Injectable} from '@nestjs/common';
import {Meni} from "../entities/meniji.entity";
import {VrstaMenija} from "../entities/vrste_menijev.entity";
import {DeleteResult, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entities/user.entity";
import {Narocilo} from "../entities/narocila.entity";
import {UserService} from "../user/user.service";
import {OrderMeniDto} from "../dto/orderMeni.dto";

@Injectable()
export class MeniService {
    constructor(
        @InjectRepository(Meni) private readonly meniRepository: Repository<Meni>,
        @InjectRepository(VrstaMenija) private readonly vrstaMenijaRepository: Repository<VrstaMenija>,
        @InjectRepository(Narocilo) private readonly orderRepository: Repository<Narocilo>,
        private readonly userService: UserService,
    ) {
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
        return await this.meniRepository.find({where:condition});
    }

    async updateMeni(id:number, data:any){
         return await this.meniRepository.update(id,{...data});
    }

    async orderMeni(id:number, userid:number){
        const meni = await this.meniRepository.findOne({where: {id: id}});
        if(!meni) throw new BadRequestException('Meni ne obstaja!');
        const user = await this.userService.findOne({id: userid});
        if(!user) throw new BadRequestException('Uporabnik ne obstaja!');
        const order = await this.findOrder(meni.datum, user.id)
        console.log(meni);
        order.user = user;
        order.meni = meni;
        order.datum = new Date();
        await this.orderRepository.save(order);
        return "Meni naročen!";
    }

    async findOrder(date:Date, userId:number): Promise<Narocilo>{
        if(!date || !userId) return new Narocilo();
        const order = await this.orderRepository.findOne({where: {meni: {datum: date}, user: {id: userId}}});
        if(order) return order;
        return new Narocilo();
    }

    async getOrderedMeni(userId: number, datum:Date) {
        const order = await this.findOrder(datum, userId);
        if(!order) throw new BadRequestException('Naročilo ne obstaja!');
        if (!order.meni) throw new BadRequestException('Meni ne obstaja!');
        return order.meni.id;
    }
}
