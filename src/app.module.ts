import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './models/User/User.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { InterestsModule as commonInterestsModule } from './interests/commonInterests/interests.module';
import CommonInterestsEntity from './models/Interests/commonInterest.entity';

import { InterestsModule as careerInterestsModule } from './interests/careerInterests/interests.module';
import CareerInterestsEntity from './models/Interests/careerInterest.entity';

import { InterestsModule as familyInterestsModule } from './interests/familyInterests/interests.module';
import FamilyInterestsEntity from './models/Interests/familyInterest.entity';

import { InterestsModule as sportInterestsModule } from './interests/sportInterests/interests.module';
import SportInterestsEntity from './models/Interests/sportInterest.entity';

import { InterestsModule as travelInterestsModule } from './interests/travelInterests/interests.module';
import TravelInterestsEntity from './models/Interests/travelInterest.entity';
import { Connection } from 'typeorm';
import { APP_PIPE } from '@nestjs/core';
import { SocialNetworksModule } from './social-networks/social-networks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: +process.env.DB_PORT,
      host: process.env.DB_HOST, //'localhost',
      username: process.env.DB_USERNAME, // 'root',
      password: process.env.DB_PASSWORD,
      synchronize: process.env.DB_SYNCHRONIZE === 'true' || false, //Boolean(false)
      database: process.env.DB_NAME,
      logging: true,
      entities: [
        User,
        CommonInterestsEntity,
        CareerInterestsEntity,
        FamilyInterestsEntity,
        SportInterestsEntity,
        TravelInterestsEntity,
      ],

      autoLoadEntities: true,
      migrations: ['migrations/*.js'],
      cli: {
        migrationsDir: 'migrations',
      },
    }),

    UsersModule,
    SocialNetworksModule,
    AuthModule,
    commonInterestsModule,
    careerInterestsModule,
    familyInterestsModule,
    sportInterestsModule,
    travelInterestsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
