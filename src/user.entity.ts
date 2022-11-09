import {Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {type} from "os";


@Entity('Dijaki')
export class User {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    ime:string;

    @Column()
    priimek:string;

    @Column({unique:true})
    eposta:string;

    @Column()
    geslo:string;

    @Column()
    telefon:string;

    @Column('integer')
    emso:number;

    @Column('integer')
    davcna:number;

    @Column('date')
    datumroj:Date;




}