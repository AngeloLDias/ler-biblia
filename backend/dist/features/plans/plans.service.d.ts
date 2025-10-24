import { Repository } from 'typeorm';
import { ReadingPlan } from '../bible/entities/reading-plan.entity';
import { ReadingProgress } from '../bible/entities/reading-progress.entity';
import { UpdateProgressDto } from './dto/update-progress.dto';
export declare class PlansService {
    private planRepo;
    private progressRepo;
    constructor(planRepo: Repository<ReadingPlan>, progressRepo: Repository<ReadingProgress>);
    getPlans(): Promise<ReadingPlan[]>;
    getPlan(id: number): Promise<ReadingPlan>;
    getProgress(planId: number): Promise<ReadingProgress[]>;
    updateProgress(planId: number, day: number, dto: UpdateProgressDto): Promise<ReadingProgress>;
    resetProgress(planId: number): Promise<{
        reset: boolean;
    }>;
}
