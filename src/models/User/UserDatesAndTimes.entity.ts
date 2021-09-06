
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User.entity';

@Entity()
export class UserDatesAndTimes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  dateOfBirth: string;

  @Column({
    type: 'timestamp',
    default: 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  activeDate: Date;

  @Column({ type: 'timestamp', default: '0000-00-00 00:00:00' })
  creationDate: Date;

  @Column({ type: 'timestamp', default: '0000-00-00 00:00:00' })
  intentionChangeDate: Date;

  @Column({ type: 'timestamp', default: '0000-00-00 00:00:00' })
  messagesCheckedDate: Date;

  @Column({ type: 'timestamp', default: '0000-00-00 00:00:00' })
  messageDate: Date;

  @Column({ type: 'timestamp', default: '0000-00-00 00:00:00' })
  notificationChackedDate: Date;

  @Column({ type: 'timestamp', default: '0000-00-00 00:00:00' })
  notificationDate: Date;

  @Column({ type: 'timestamp', default: '0000-00-00 00:00:00' })
  lastLoginDate: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
