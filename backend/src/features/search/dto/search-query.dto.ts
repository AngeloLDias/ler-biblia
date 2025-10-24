import { IsString, IsOptional, IsNumber, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SearchQueryDto {
  @ApiProperty({ description: 'Search query text' })
  @IsString()
  query: string;

  @ApiPropertyOptional({ description: 'Translation ID to search in' })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  translationId?: number;

  @ApiPropertyOptional({ description: 'Testament filter: OT or NT' })
  @IsString()
  @IsIn(['OT', 'NT'])
  @IsOptional()
  testament?: string;

  @ApiPropertyOptional({ description: 'Book ID to search in' })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  bookId?: number;
}

