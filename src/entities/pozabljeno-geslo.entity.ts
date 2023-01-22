import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

@Entity('pozabljeno_geslo')
export class PozabljenoGesloEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.id,{eager: true})
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column()
    token: string;

    @Column()
    datum: Date;


}