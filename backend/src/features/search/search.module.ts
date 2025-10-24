import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { Verse } from '../bible/entities/verse.entity';
import { Book } from '../bible/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Verse, Book])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}

