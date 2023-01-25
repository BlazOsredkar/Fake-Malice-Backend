import {BadRequestException, Injectable} from '@nestjs/common';
import {User} from "../entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {PozabljenoGesloEntity} from "../entities/pozabljeno-geslo.entity";
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from "bcrypt";
import {ResetPasswordDto} from "../dto/resetPassword.dto";



@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(PozabljenoGesloEntity) private readonly pozabljenoGesloRepository: Repository<PozabljenoGesloEntity>,
    ) {
    }
    async findOne(condition:any): Promise<User>{

        return await this.userRepository.findOne({where:condition});
    }

    async create(data: any): Promise<User>{
        return await this.userRepository.save(data);
    }

    async forgotPassword(data: any): Promise<User[]>{
        return await this.userRepository.find(data);
    }

    async createPozabljenoGeslo(user: User): Promise<string>{
        const oldPozabljenoGeslo = await this.findOnePozabljenoGeslo(user.eposta);
        if(oldPozabljenoGeslo){
            await this.pozabljenoGesloRepository.remove(oldPozabljenoGeslo);
        }
        const token = uuidv4();
        const tokenHash = await bcrypt.hash(token, 10);
        let pozabljenoGeslo = new PozabljenoGesloEntity();
        pozabljenoGeslo.token = tokenHash;
        const milisekunde = new Date().getTime() + 86400000;
        pozabljenoGeslo.datum = new Date(milisekunde);
        pozabljenoGeslo.user = user;
        await this.pozabljenoGesloRepository.save(pozabljenoGeslo);
        return token;

    }


    async findOnePozabljenoGeslo(eposta: string): Promise<PozabljenoGesloEntity>{
        return await this.pozabljenoGesloRepository.findOne({
            where: {
                user: {
                    eposta: eposta
                }
            }
        });
    }

    async resetPassword(body: ResetPasswordDto){
        if (body.geslo !== body.ponovnoGeslo) {
            throw new BadRequestException('Gesli se ne ujemata');
        }
        const pozabljenoGeslo = await this.findOnePozabljenoGeslo(body.email);
        if(!pozabljenoGeslo){
            throw new BadRequestException('Invalid token');
        }
        const compareToken = await bcrypt.compare(body.token, pozabljenoGeslo.token);
        if(!compareToken){
            throw new BadRequestException('Invalid token');
        }
        const datum = new Date();
        if(datum > pozabljenoGeslo.datum){
            throw new BadRequestException('Token has expired');
        }
        const user = pozabljenoGeslo.user;
        const hashpassword = await bcrypt.hash(body.geslo, 10);
        user.geslo = hashpassword;
        await this.userRepository.save(user);
        await this.pozabljenoGesloRepository.remove(pozabljenoGeslo);
        return "Password reset successfully";

    }
}