import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('Jedilnice')
    export class Jedilnica{

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    ime:string;

}
