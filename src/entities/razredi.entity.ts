import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Sole} from "./sole.entity";

@Entity('Razredi')
export class Razredi {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @ManyToOne(type => Sole, sole => sole.id)
    @JoinColumn({name: 'sola_id'})
    sola:Sole;

    @Column()
    ime:string;

    @Column()
    sol_leto:number;




}