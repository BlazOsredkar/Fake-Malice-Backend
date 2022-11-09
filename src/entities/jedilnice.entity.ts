import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('Jedilnice')
    export class Jedilnice{

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    ime:string;

}
