import { Translation } from './translation.entity';
export declare class Verse {
    id: number;
    translationId: number;
    bookId: number;
    chapter: number;
    verse: number;
    text: string;
    translation: Translation;
}
