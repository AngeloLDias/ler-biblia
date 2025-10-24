import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProgressDto {
  @ApiProperty({ description: 'Whether the day is completed' })
  @IsBoolean()
  completed: boolean;
}

