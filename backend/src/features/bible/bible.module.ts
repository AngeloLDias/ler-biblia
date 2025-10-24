import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BibleController } from './bible.controller';
import { BibleService } from './bible.service';
import { Translation } from './entities/translation.entity';
import { Book } from './entities/book.entity';
import { Verse } from './entities/verse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Translation, Book, Verse])],
  controllers: [BibleController],
  providers: [BibleService],
  exports: [BibleService],
})
export class BibleModule {}

