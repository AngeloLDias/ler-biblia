import { PlansService } from './plans.service';
import { UpdateProgressDto } from './dto/update-progress.dto';
export declare class PlansController {
    private readonly plansService;
    constructor(plansService: PlansService);
    getPlans(): Promise<import("../bible/entities/reading-plan.entity").ReadingPlan[]>;
    getPlan(id: number): Promise<import("../bible/entities/reading-plan.entity").ReadingPlan>;
    getProgress(id: number): Promise<import("../bible/entities/reading-progress.entity").ReadingProgress[]>;
    updateProgress(id: number, day: number, dto: UpdateProgressDto): Promise<import("../bible/entities/reading-progress.entity").ReadingProgress>;
    resetProgress(id: number): Promise<{
        reset: boolean;
    }>;
}
