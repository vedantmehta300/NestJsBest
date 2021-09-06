import { Module } from '@nestjs/common';
import { InterestsService } from './interests.service';
import { InterestsController } from './interests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import InterestEntity from '../../models/Interests/careerInterest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InterestEntity])],
  providers: [InterestsService],
  controllers: [InterestsController],
  exports: [TypeOrmModule, InterestsService],
})
export class InterestsModule {}
