import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('pozabljeno_geslo')
export class PozabljenoGesloEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    token: string;

    @Column()
    datum: Date;


}