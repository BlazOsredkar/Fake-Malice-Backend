import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Ceuviz')
export class Ceuviz {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  status: string;

  @Column('decimal')
  cena: number;
}
