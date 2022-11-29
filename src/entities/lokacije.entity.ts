import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Kraj } from './kraji.entity';

@Entity('Lokacije')
export class Lokacija {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  naslov: string;

  @Column()
  ime: string;

  @ManyToOne((type) => Kraj, (kraj) => kraj.id)
  @JoinColumn({ name: 'kraj_id' })
  kraj: Kraj;
}
