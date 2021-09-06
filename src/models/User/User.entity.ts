import { Exclude } from 'class-transformer';
import { Validate } from 'class-validator';
import { Intention } from 'src/models/User/Intention.entity';
import { Profile } from 'src/models/User/Profile.entity';
//import { Color } from 'src/models/User/Colors.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { SocialNetwork } from './SocialNetwork.entity';
import { UserPhoto } from './UserPhoto.entity';
import { hash } from 'bcrypt';
import { UserInterestdto } from '@app/users/userinterest.dto';

export type Gender = 'male' | 'female' | 'other';

export const Genders: Gender[] = ['male', 'female', 'other'];

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({
  //   type: 'varchar',
  //   nullable: false,
  //   unique: true,
  // })
  // username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  phone: string;

  @Column()
  profileImageUrl: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isAdmin: boolean;

  @Column()
  locationLatitude: string;

  @Column()
  locationLongitude: string;

  @Column()
  numberProfileViews: number;

  @Column()
  numberOfSearches: number;

  @Column()
  preferedMaxAge: number;

  @Column()
  preferedMinAge: number;

  //@OneToOne(() => Color, (color) => color.user)
  @Column()
  eyeColour: string;

  @Column({
    type: 'enum',
    enum: ['black', 'red'],
  })
  hairColour: string;

  @Column({
    type: 'enum',
    enum: [164, 165],
  })
  height: number;

  @Column({
    type: 'enum',
    enum: ['thin', 'fat'],
  })
  bodyType: string;

  @Column({
    type: 'enum',
    enum: ['short', 'long'],
  })
  hairStyle: string;

  @Column({
    type: 'enum',
    enum: ['white', 'black'],
  })
  skinColor: string;

  @Column({
    type: 'enum',
    enum: [60, 70],
  })
  weight: number;

  @Column()
  @Validate((value: Gender) => {
    return Genders.includes(value);
  })
  gender: Gender;

  @Column()
  birthDate: string;

  @Column()
  @Validate((value: Gender) => {
    return Genders.includes(value);
  })
  preferedGenders: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;

  @OneToOne(() => Intention, (intention) => intention.user)
  @JoinColumn()
  intention: Intention;

  @Exclude()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @Column()
  workStatus: string;

  @Column()
  position: string;

  @Column()
  cityName: string;

  @Column()
  isOnline: boolean;

  @OneToMany(() => UserPhoto, (photo) => photo.user)
  userPhotos?: UserPhoto[];

  @OneToMany(() => SocialNetwork, (sc) => sc.user)
  socialMediaLinks?: SocialNetwork[];

  geo: string;
  interests?: UserInterestdto[];
}
