import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { ReadingPlan } from '../bible/entities/reading-plan.entity';
import { ReadingProgress } from '../bible/entities/reading-progress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReadingPlan, ReadingProgress])],
  controllers: [PlansController],
  providers: [PlansService],
})
export class PlansModule {}

