import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {VrstaMenija} from "./vrste_menijev.entity";

@Entity('Meniji')
export class Meni {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    opis:string;

    @ManyToOne((type) => VrstaMenija, (vrstaMenija) => vrstaMenija.id, {eager:true})
    @JoinColumn({name: 'vrsta_menija_id'})
    vrstaMenija:VrstaMenija;

    @Column()
    datum:Date;



}