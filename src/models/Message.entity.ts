import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Conversation } from './Conversation.entity';
import { User } from './User/User.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @ManyToOne(() => Conversation)
  conversation: Conversation;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User)
  @JoinColumn()
  from: User;

  @ManyToOne(() => User)
  @JoinColumn()
  to: User;
}
