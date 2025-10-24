import { IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetChapterDto {
  @ApiProperty({ description: 'Translation ID' })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  translationId: number;

  @ApiProperty({ description: 'Book ID' })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  bookId: number;

  @ApiProperty({ description: 'Chapter number' })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  chapter: number;
}

