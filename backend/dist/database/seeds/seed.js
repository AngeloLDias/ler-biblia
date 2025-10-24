"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const translation_entity_1 = require("../../features/bible/entities/translation.entity");
const book_entity_1 = require("../../features/bible/entities/book.entity");
const verse_entity_1 = require("../../features/bible/entities/verse.entity");
const reading_plan_entity_1 = require("../../features/bible/entities/reading-plan.entity");
const books_data_1 = require("./books.data");
const sample_verses_data_1 = require("./sample-verses.data");
const AppDataSource = new typeorm_1.DataSource({
    type: 'better-sqlite3',
    database: 'bible.db',
    entities: [translation_entity_1.Translation, book_entity_1.Book, verse_entity_1.Verse, reading_plan_entity_1.ReadingPlan],
    synchronize: true,
});
async function seed() {
    try {
        await AppDataSource.initialize();
        console.log('Data Source initialized');
        const translationRepo = AppDataSource.getRepository(translation_entity_1.Translation);
        const bookRepo = AppDataSource.getRepository(book_entity_1.Book);
        const verseRepo = AppDataSource.getRepository(verse_entity_1.Verse);
        const planRepo = AppDataSource.getRepository(reading_plan_entity_1.ReadingPlan);
        await verseRepo.clear();
        await translationRepo.clear();
        await bookRepo.clear();
        await planRepo.clear();
        console.log('Seeding translations...');
        const translations = await translationRepo.save(sample_verses_data_1.translationsData);
        console.log(`✓ ${translations.length} translations seeded`);
        console.log('Seeding books...');
        const books = await bookRepo.save(books_data_1.booksData);
        console.log(`✓ ${books.length} books seeded`);
        console.log('Seeding sample verses...');
        const verses = [];
        for (const verseData of sample_verses_data_1.sampleVersesData) {
            const translation = translations.find(t => t.code === verseData.translationCode);
            const book = books.find(b => b.abbreviation === verseData.bookAbbr);
            if (translation && book) {
                verses.push({
                    translationId: translation.id,
                    bookId: book.id,
                    chapter: verseData.chapter,
                    verse: verseData.verse,
                    text: verseData.text,
                });
            }
        }
        await verseRepo.save(verses);
        console.log(`✓ ${verses.length} sample verses seeded`);
        console.log('Seeding reading plans...');
        const plans = [
            {
                name: 'Evangelhos em 30 Dias',
                description: 'Leia os quatro evangelhos em um mês',
                totalDays: 30,
                isActive: true,
                schedule: [
                    { day: 1, readings: [{ bookId: 40, startChapter: 1, endChapter: 4 }] },
                    { day: 2, readings: [{ bookId: 40, startChapter: 5, endChapter: 7 }] },
                ],
            },
            {
                name: 'Salmos em 30 Dias',
                description: 'Leia 5 salmos por dia durante um mês',
                totalDays: 30,
                isActive: true,
                schedule: [
                    { day: 1, readings: [{ bookId: 19, startChapter: 1, endChapter: 5 }] },
                    { day: 2, readings: [{ bookId: 19, startChapter: 6, endChapter: 10 }] },
                ],
            },
        ];
        await planRepo.save(plans);
        console.log(`✓ ${plans.length} reading plans seeded`);
        console.log('\n✅ Database seeded successfully!');
        await AppDataSource.destroy();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seed();
//# sourceMappingURL=seed.js.map