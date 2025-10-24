import { Verse } from './verse.entity';
export declare class Translation {
    id: number;
    code: string;
    name: string;
    language: string;
    isActive: boolean;
    verses: Verse[];
}
