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
export class UserInterest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    default: null,
  })
  title: string;

  @Column({
    type: 'enum',
    enum: ['common', 'career', 'family', 'sport', 'travel'],
  })
  category: string;

  @Column()
  interestId: number;

  @Column()
  userId: number;

  @Column()
  description: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
