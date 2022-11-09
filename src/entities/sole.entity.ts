import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('Sole')
export class Sole {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    ime:string;
}