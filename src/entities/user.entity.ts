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

  @Column()
  emso: number;

  @Column()
  davcna: number;

  @Column('date')
  datumroj: Date;

  @Column('real', { default: 0.0 })
  stanjerac: number;

  @Column({ default: false })
  isadmin: boolean;

  @ManyToOne((type) => Razred, (razred) => razred.id)
  @JoinColumn({ name: 'razred_id' })
  razred: Razred;

  @ManyToOne((type) => Kraj, (kraj) => kraj.id)
  @JoinColumn({ name: 'kraj_id' })
  kraj: Kraj;

}
