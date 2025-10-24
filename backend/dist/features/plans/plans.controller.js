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
exports.PlansController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const plans_service_1 = require("./plans.service");
const update_progress_dto_1 = require("./dto/update-progress.dto");
let PlansController = class PlansController {
    plansService;
    constructor(plansService) {
        this.plansService = plansService;
    }
    async getPlans() {
        return this.plansService.getPlans();
    }
    async getPlan(id) {
        return this.plansService.getPlan(id);
    }
    async getProgress(id) {
        return this.plansService.getProgress(id);
    }
    async updateProgress(id, day, dto) {
        return this.plansService.updateProgress(id, day, dto);
    }
    async resetProgress(id) {
        return this.plansService.resetProgress(id);
    }
};
exports.PlansController = PlansController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all reading plans' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns all active reading plans' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "getPlans", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific reading plan' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns a reading plan' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "getPlan", null);
__decorate([
    (0, common_1.Get)(':id/progress'),
    (0, swagger_1.ApiOperation)({ summary: 'Get progress for a reading plan' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns progress for a plan' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "getProgress", null);
__decorate([
    (0, common_1.Put)(':id/progress/:day'),
    (0, swagger_1.ApiOperation)({ summary: 'Update progress for a specific day' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Progress updated' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('day', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_progress_dto_1.UpdateProgressDto]),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "updateProgress", null);
__decorate([
    (0, common_1.Delete)(':id/progress'),
    (0, swagger_1.ApiOperation)({ summary: 'Reset progress for a reading plan' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Progress reset' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlansController.prototype, "resetProgress", null);
exports.PlansController = PlansController = __decorate([
    (0, swagger_1.ApiTags)('plans'),
    (0, common_1.Controller)('v1/plans'),
    __metadata("design:paramtypes", [plans_service_1.PlansService])
], PlansController);
//# sourceMappingURL=plans.controller.js.map