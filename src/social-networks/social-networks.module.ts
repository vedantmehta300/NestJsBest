import { Module } from '@nestjs/common';
import { SocialNetworksService } from './social-networks.service';
import { SocialNetworksController } from './social-networks.controller';
import { SocialNetwork } from '@app/models/User/SocialNetwork.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SocialNetwork])],
  controllers: [SocialNetworksController],
  providers: [SocialNetworksService],
  exports: [TypeOrmModule, SocialNetworksService],
})
export class SocialNetworksModule {}
