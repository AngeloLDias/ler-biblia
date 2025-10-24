import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Translation } from './entities/translation.entity';
import { Book } from './entities/book.entity';
import { Verse } from './entities/verse.entity';

@Injectable()
export class BibleService {
  constructor(
    @InjectRepository(Translation)
    private translationRepo: Repository<Translation>,
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
    @InjectRepository(Verse)
    private verseRepo: Repository<Verse>,
  ) {}

  async getTranslations() {
    return this.translationRepo.find({
      where: { isActive: true },
      order: { code: 'ASC' },
    });
  }

  async getBooks(testament?: string) {
    const where = testament ? { testament } : {};
    return this.bookRepo.find({
      where,
      order: { order: 'ASC' },
    });
  }

  async getBook(id: number) {
    return this.bookRepo.findOne({ where: { id } });
  }

  async getChapter(translationId: number, bookId: number, chapter: number) {
    return this.verseRepo.find({
      where: { translationId, bookId, chapter },
      order: { verse: 'ASC' },
    });
  }

  async getVerse(translationId: number, bookId: number, chapter: number, verse: number) {
    return this.verseRepo.findOne({
      where: { translationId, bookId, chapter, verse },
    });
  }
}

