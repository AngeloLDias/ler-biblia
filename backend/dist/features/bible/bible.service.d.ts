import { Repository } from 'typeorm';
import { Translation } from './entities/translation.entity';
import { Book } from './entities/book.entity';
import { Verse } from './entities/verse.entity';
export declare class BibleService {
    private translationRepo;
    private bookRepo;
    private verseRepo;
    constructor(translationRepo: Repository<Translation>, bookRepo: Repository<Book>, verseRepo: Repository<Verse>);
    getTranslations(): Promise<Translation[]>;
    getBooks(testament?: string): Promise<Book[]>;
    getBook(id: number): Promise<Book | null>;
    getChapter(translationId: number, bookId: number, chapter: number): Promise<Verse[]>;
    getVerse(translationId: number, bookId: number, chapter: number, verse: number): Promise<Verse | null>;
}
