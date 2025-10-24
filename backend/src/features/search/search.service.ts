import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Verse } from '../bible/entities/verse.entity';
import { Book } from '../bible/entities/book.entity';
import { SearchQueryDto } from './dto/search-query.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Verse)
    private verseRepo: Repository<Verse>,
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
  ) {}

  async search(searchDto: SearchQueryDto) {
    const { query, translationId, testament, bookId } = searchDto;

    // Build where clause
    const where: any = {
      text: Like(`%${query}%`),
    };

    if (translationId) {
      where.translationId = translationId;
    }

    if (bookId) {
      where.bookId = bookId;
    }

    // If testament filter is provided, get book IDs for that testament
    let bookIds: number[] | undefined;
    if (testament) {
      const books = await this.bookRepo.find({ where: { testament } });
      bookIds = books.map(b => b.id);
      
      if (bookIds.length > 0) {
        // If bookId is also specified, ensure it's in the testament
        if (bookId && !bookIds.includes(bookId)) {
          return [];
        }
        // If no specific bookId, filter by testament books
        if (!bookId) {
          where.bookId = bookIds.length === 1 ? bookIds[0] : undefined;
          // For multiple books, we'll need to use In operator
          if (bookIds.length > 1) {
            delete where.bookId;
          }
        }
      }
    }

    const queryBuilder = this.verseRepo.createQueryBuilder('verse');
    queryBuilder.where('verse.text LIKE :query', { query: `%${query}%` });

    if (translationId) {
      queryBuilder.andWhere('verse.translationId = :translationId', { translationId });
    }

    if (bookId) {
      queryBuilder.andWhere('verse.bookId = :bookId', { bookId });
    } else if (bookIds && bookIds.length > 1) {
      queryBuilder.andWhere('verse.bookId IN (:...bookIds)', { bookIds });
    }

    queryBuilder.orderBy('verse.bookId', 'ASC')
      .addOrderBy('verse.chapter', 'ASC')
      .addOrderBy('verse.verse', 'ASC')
      .limit(100); // Limit results for performance

    return queryBuilder.getMany();
  }
}

