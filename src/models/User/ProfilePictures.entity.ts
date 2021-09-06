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
export class ProfilePicture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  updatedAt: string;

  @Column()
  imageData: string;

  @Column()
  imageUrl: string;

  @ManyToOne(() => User)
  @JoinColumn()
  from: User;
}
