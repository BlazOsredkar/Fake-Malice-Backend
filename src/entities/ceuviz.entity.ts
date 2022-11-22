import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity() export class Ceuviz {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    status:string;

    @Column()
    cena:number;
}