import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('VrsteMenijev')
export class VrstaMenija {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  ime: string;

  @Column()
  opis: string;

  @Column()
  ikona: string;
}
