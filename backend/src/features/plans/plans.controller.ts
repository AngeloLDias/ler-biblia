import { Controller, Get, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PlansService } from './plans.service';
import { UpdateProgressDto } from './dto/update-progress.dto';

@ApiTags('plans')
@Controller('v1/plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  @ApiOperation({ summary: 'Get all reading plans' })
  @ApiResponse({ status: 200, description: 'Returns all active reading plans' })
  async getPlans() {
    return this.plansService.getPlans();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific reading plan' })
  @ApiResponse({ status: 200, description: 'Returns a reading plan' })
  async getPlan(@Param('id', ParseIntPipe) id: number) {
    return this.plansService.getPlan(id);
  }

  @Get(':id/progress')
  @ApiOperation({ summary: 'Get progress for a reading plan' })
  @ApiResponse({ status: 200, description: 'Returns progress for a plan' })
  async getProgress(@Param('id', ParseIntPipe) id: number) {
    return this.plansService.getProgress(id);
  }

  @Put(':id/progress/:day')
  @ApiOperation({ summary: 'Update progress for a specific day' })
  @ApiResponse({ status: 200, description: 'Progress updated' })
  async updateProgress(
    @Param('id', ParseIntPipe) id: number,
    @Param('day', ParseIntPipe) day: number,
    @Body() dto: UpdateProgressDto,
  ) {
    return this.plansService.updateProgress(id, day, dto);
  }

  @Delete(':id/progress')
  @ApiOperation({ summary: 'Reset progress for a reading plan' })
  @ApiResponse({ status: 200, description: 'Progress reset' })
  async resetProgress(@Param('id', ParseIntPipe) id: number) {
    return this.plansService.resetProgress(id);
  }
}

