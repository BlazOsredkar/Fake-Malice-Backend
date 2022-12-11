import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {Meni} from "./meniji.entity";


@Entity('Narocila')
export class Narocilo {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @ManyToOne(type => User, user => user.id)
    @JoinColumn({name: 'user_id'})
    user:User;

    @ManyToOne(type => Meni, meni => meni.id)
    @JoinColumn({name: 'meni_id'})
    meni:Meni;

    @Column()
    datum:Date;
    
}