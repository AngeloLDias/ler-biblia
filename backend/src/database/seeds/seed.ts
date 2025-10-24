import { DataSource } from 'typeorm';
import { Translation } from '../../features/bible/entities/translation.entity';
import { Book } from '../../features/bible/entities/book.entity';
import { Verse } from '../../features/bible/entities/verse.entity';
import { ReadingPlan } from '../../features/bible/entities/reading-plan.entity';
import { booksData } from './books.data';
import { sampleVersesData, translationsData } from './sample-verses.data';

const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'bible.db',
  entities: [Translation, Book, Verse, ReadingPlan],
  synchronize: true,
});

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log('Data Source initialized');

    const translationRepo = AppDataSource.getRepository(Translation);
    const bookRepo = AppDataSource.getRepository(Book);
    const verseRepo = AppDataSource.getRepository(Verse);
    const planRepo = AppDataSource.getRepository(ReadingPlan);

    // Clear existing data
    await verseRepo.clear();
    await translationRepo.clear();
    await bookRepo.clear();
    await planRepo.clear();

    console.log('Seeding translations...');
    const translations = await translationRepo.save(translationsData);
    console.log(`✓ ${translations.length} translations seeded`);

    console.log('Seeding books...');
    const books = await bookRepo.save(booksData);
    console.log(`✓ ${books.length} books seeded`);

    console.log('Seeding sample verses...');
    const verses: Array<{
      translationId: number;
      bookId: number;
      chapter: number;
      verse: number;
      text: string;
    }> = [];
    for (const verseData of sampleVersesData) {
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
          // Add more days as needed
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
          // Add more days as needed
        ],
      },
    ];
    await planRepo.save(plans);
    console.log(`✓ ${plans.length} reading plans seeded`);

    console.log('\n✅ Database seeded successfully!');
    await AppDataSource.destroy();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();

