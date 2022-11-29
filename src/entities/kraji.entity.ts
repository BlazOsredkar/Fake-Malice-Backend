import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Kraji')
export class Kraj {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    ime:string;

    @Column()
    postnaStevilka:number;

    
}