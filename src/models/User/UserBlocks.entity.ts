
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity()
export class UserBlock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  from: User;

  @ManyToOne(() => User)
  @JoinColumn()
  to: User;
}
