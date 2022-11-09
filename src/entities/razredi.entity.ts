import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Sola} from "./sole.entity";

@Entity('Razredi')
export class Razred {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @ManyToOne(type => Sola, sola => sola.id)
    @JoinColumn({name: 'sola_id'})
    sola:Sola;

    @Column()
    ime:string;

    @Column()
    sol_leto:number;




}