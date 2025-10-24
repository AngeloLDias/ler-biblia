import { BibleService } from './bible.service';
import { GetChapterDto } from './dto/get-chapter.dto';
export declare class BibleController {
    private readonly bibleService;
    constructor(bibleService: BibleService);
    getTranslations(): Promise<import("./entities/translation.entity").Translation[]>;
    getBooks(testament?: string): Promise<import("./entities/book.entity").Book[]>;
    getBook(id: number): Promise<import("./entities/book.entity").Book | null>;
    getChapter(query: GetChapterDto): Promise<import("./entities/verse.entity").Verse[]>;
    getVerse(translationId: number, bookId: number, chapter: number, verse: number): Promise<import("./entities/verse.entity").Verse | null>;
}
