
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User/User.entity';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'timestamp' })
  lastOpened: Date;

  @Column({ type: 'timestamp' })
  lastUpdated: Date;

  @Column()
  lastMessage: string;

  @ManyToOne(() => User)
  @JoinColumn()
  from: User;

  @ManyToOne(() => User)
  @JoinColumn()
  to: User;
}
