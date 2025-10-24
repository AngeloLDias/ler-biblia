import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadingPlan } from '../bible/entities/reading-plan.entity';
import { ReadingProgress } from '../bible/entities/reading-progress.entity';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(ReadingPlan)
    private planRepo: Repository<ReadingPlan>,
    @InjectRepository(ReadingProgress)
    private progressRepo: Repository<ReadingProgress>,
  ) {}

  async getPlans() {
    return this.planRepo.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    });
  }

  async getPlan(id: number) {
    const plan = await this.planRepo.findOne({ where: { id } });
    if (!plan) {
      throw new NotFoundException(`Reading plan with ID ${id} not found`);
    }
    return plan;
  }

  async getProgress(planId: number) {
    return this.progressRepo.find({
      where: { planId },
      order: { day: 'ASC' },
    });
  }

  async updateProgress(planId: number, day: number, dto: UpdateProgressDto) {
    let progress = await this.progressRepo.findOne({
      where: { planId, day },
    });

    if (!progress) {
      progress = this.progressRepo.create({
        planId,
        day,
        completed: dto.completed,
        completedAt: dto.completed ? new Date() : null,
      });
    } else {
      progress.completed = dto.completed;
      progress.completedAt = dto.completed ? new Date() : null;
    }

    return this.progressRepo.save(progress);
  }

  async resetProgress(planId: number) {
    await this.progressRepo.delete({ planId });
    return { reset: true };
  }
}

