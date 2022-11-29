import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {VrstaMenija} from "./vrste_menijev.entity";
import {Lokacija} from "./lokacije.entity";

@Entity('Meniji')
export class Meni {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    opis:string;

    @ManyToOne((type) => VrstaMenija, (vrstaMenija) => vrstaMenija.id)
    @JoinColumn({name: 'vrsta_menija_id'})
    vrstaMenija:VrstaMenija;

    @ManyToOne((type) => Lokacija, (lokacija) => lokacija.id)
    @JoinColumn({name: 'lokacija_id'})
    lokacija:Lokacija;


}