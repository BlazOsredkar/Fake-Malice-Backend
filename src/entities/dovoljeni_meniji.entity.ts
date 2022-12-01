import {Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Razred} from "./razredi.entity";
import {Meni} from "./meniji.entity";

@Entity('DovoljeniMeniji')
export class DovoljeniMeni {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @ManyToOne((type) => Razred, (razred) => razred.id)
    @JoinColumn({name: 'razred_id'})
    razred:Razred;

    @ManyToOne((type) => Meni, (meni) => meni.id)
    @JoinColumn({name: 'meni_id'})
    meni:Meni;

}