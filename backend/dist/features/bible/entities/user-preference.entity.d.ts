export declare class UserPreference {
    id: number;
    userId: number;
    defaultTranslationId: number;
    theme: string;
    fontSize: number;
    lastRead: {
        bookId: number;
        chapter: number;
    };
    createdAt: Date;
    updatedAt: Date;
}
