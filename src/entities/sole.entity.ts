import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Sole')
export class Sola {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  ime: string;

  @Column()
  kratica: string;
}
