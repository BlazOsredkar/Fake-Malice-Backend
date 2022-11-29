import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class VrstaMenija {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    ime:string;

    @Column()
    opis:string;

    @Column()
    ikona:string;
}