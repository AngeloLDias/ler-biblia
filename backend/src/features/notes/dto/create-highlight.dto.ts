import { IsNumber, IsString, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHighlightDto {
  @ApiProperty({ description: 'Verse ID' })
  @IsNumber()
  @IsPositive()
  verseId: number;

  @ApiProperty({ description: 'Highlight color', example: 'yellow' })
  @IsString()
  color: string;
}

