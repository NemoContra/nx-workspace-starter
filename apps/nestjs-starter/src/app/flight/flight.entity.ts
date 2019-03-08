import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FlightEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  from: string;

  @Column('text')
  to: string;

  @Column('timestamp')
  date: string;

  @Column({type: 'boolean', default: false})
  delayed: boolean;
}
