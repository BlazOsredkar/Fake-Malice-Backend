import {Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {type} from "os";
import {Sola} from "./sole.entity";
import {Razred} from "./razredi.entity";


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

    @Column()
    emso:number;

    @Column()
    davcna:number;

    @Column('date')
    datumroj:Date;

    @Column('real')
    stanjerac:number;

    @ManyToOne(type => Razred, razred => razred.id)
    @JoinColumn({name: 'razred_id'})
    razred:Razred;


}