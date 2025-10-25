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
    getInfo(): Promise<{
        message: string;
        translations: {
            id: number;
            code: string;
            name: string;
            language: string;
            hasVerses: boolean;
        }[];
        books: {
            id: number;
            name: string;
            abbreviation: string;
            order: number;
            testament: string;
        }[];
        examples: {
            getTranslations: string;
            getBooks: string;
            getChapter: string;
            getVerse: string;
            getInfo: string;
        };
        notes: string[];
    }>;
}
