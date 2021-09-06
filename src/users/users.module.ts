import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  User,
  Profile,
  Intention,
  UserBlock,
  UserDatesAndTimes,
  UserInterest,
  UserLikes,
  UserPhoto,
} from '../models/User';
import { SocialNetwork } from '@app/models/User/SocialNetwork.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Profile,
      Intention,
      UserBlock,
      UserDatesAndTimes,
      UserInterest,
      UserLikes,
      UserPhoto,
      SocialNetwork,
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
