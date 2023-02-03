import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity("Spol")
export class Spol {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    ime: string;

    @Column()
    kratica: string;
}