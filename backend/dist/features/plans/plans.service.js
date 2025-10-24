"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlansService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const reading_plan_entity_1 = require("../bible/entities/reading-plan.entity");
const reading_progress_entity_1 = require("../bible/entities/reading-progress.entity");
let PlansService = class PlansService {
    planRepo;
    progressRepo;
    constructor(planRepo, progressRepo) {
        this.planRepo = planRepo;
        this.progressRepo = progressRepo;
    }
    async getPlans() {
        return this.planRepo.find({
            where: { isActive: true },
            order: { createdAt: 'DESC' },
        });
    }
    async getPlan(id) {
        const plan = await this.planRepo.findOne({ where: { id } });
        if (!plan) {
            throw new common_1.NotFoundException(`Reading plan with ID ${id} not found`);
        }
        return plan;
    }
    async getProgress(planId) {
        return this.progressRepo.find({
            where: { planId },
            order: { day: 'ASC' },
        });
    }
    async updateProgress(planId, day, dto) {
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
        }
        else {
            progress.completed = dto.completed;
            progress.completedAt = dto.completed ? new Date() : null;
        }
        return this.progressRepo.save(progress);
    }
    async resetProgress(planId) {
        await this.progressRepo.delete({ planId });
        return { reset: true };
    }
};
exports.PlansService = PlansService;
exports.PlansService = PlansService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reading_plan_entity_1.ReadingPlan)),
    __param(1, (0, typeorm_1.InjectRepository)(reading_progress_entity_1.ReadingProgress)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PlansService);
//# sourceMappingURL=plans.service.js.map