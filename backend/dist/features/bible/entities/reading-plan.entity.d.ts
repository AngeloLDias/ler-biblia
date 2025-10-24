export declare class ReadingPlan {
    id: number;
    name: string;
    description: string;
    totalDays: number;
    schedule: Array<{
        day: number;
        readings: Array<{
            bookId: number;
            startChapter: number;
            endChapter: number;
        }>;
    }>;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
