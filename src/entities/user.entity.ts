import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { type } from 'os';
import { Sola } from './sole.entity';
import { Razred } from './razredi.entity';
import {Kraj} from "./kraji.entity";
import {Spol} from "./spol.entity";

@Entity('Dijaki')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  ime: string;

  @Column()
  priimek: string;

  @Column({ unique: true })
  eposta: string;

  @Column()
  geslo: string;

  @Column()
  telefon: string;

  @Column({ type: 'bigint', unique: true })
  emso: number;

  @Column('date')
  datumroj: Date;

  @Column('real', { default: 0.0 })
  stanjerac: number;

  @Column({ default: false })
  isadmin: boolean;

  @ManyToOne((type) => Razred, (razred) => razred.id, { eager: true })
  @JoinColumn({ name: 'user_razred_id' })
  razred: Razred;

  @ManyToOne((type) => Kraj, (kraj) => kraj.id, { eager: true })
  @JoinColumn({ name: 'user_kraj_id' })
  kraj: Kraj;


  @ManyToOne((type) => Spol, (spol) => spol.id, { eager: true })
  @JoinColumn({ name: 'user_spol_id' })
  spol: Spol;

  @Column({nullable: true})
  naslov: string;
}
