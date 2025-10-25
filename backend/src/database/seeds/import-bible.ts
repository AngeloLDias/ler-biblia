import { DataSource } from 'typeorm';
import { Verse } from '../../features/bible/entities/verse.entity';
import { Book } from '../../features/bible/entities/book.entity';
import { Translation } from '../../features/bible/entities/translation.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Script para importar a Bíblia completa de um arquivo JSON
 *
 * Formato esperado do JSON:
 * {
 *   "translation": "NVI",
 *   "books": [
 *     {
 *       "bookId": 1,
 *       "chapters": [
 *         {
 *           "chapter": 1,
 *           "verses": [
 *             { "verse": 1, "text": "No princípio..." },
 *             { "verse": 2, "text": "..." }
 *           ]
 *         }
 *       ]
 *     }
 *   ]
 * }
 *
 * Como usar:
 * 1. Baixe o arquivo JSON da Bíblia
 * 2. Coloque em backend/src/database/seeds/data/
 * 3. Execute: npm run import-bible
 */

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'ler_biblia',
  entities: [Translation, Book, Verse],
  synchronize: false,
});

async function importBible(jsonFilePath: string) {
  await dataSource.initialize();
  console.log('📖 Iniciando importação da Bíblia...');

  try {
    // Ler arquivo JSON
    const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
    const bibleData = JSON.parse(jsonData);

    const verseRepo = dataSource.getRepository(Verse);
    const translationRepo = dataSource.getRepository(Translation);

    // Buscar ou criar tradução
    let translation = await translationRepo.findOne({
      where: { code: bibleData.translation },
    });

    if (!translation) {
      console.log(`❌ Tradução ${bibleData.translation} não encontrada no banco.`);
      console.log('Execute o seed primeiro: npm run seed');
      return;
    }

    console.log(`✅ Tradução encontrada: ${translation.name}`);

    let totalVerses = 0;
    const batchSize = 1000;
    let verseBatch: any[] = [];

    // Importar versículos
    for (const book of bibleData.books) {
      console.log(`📚 Importando livro ID ${book.bookId}...`);

      for (const chapterData of book.chapters) {
        for (const verseData of chapterData.verses) {
          verseBatch.push({
            translationId: translation.id,
            bookId: book.bookId,
            chapter: chapterData.chapter,
            verse: verseData.verse,
            text: verseData.text,
          });

          totalVerses++;

          // Inserir em lotes para melhor performance
          if (verseBatch.length >= batchSize) {
            await verseRepo.save(verseBatch);
            console.log(`  ✓ ${totalVerses} versículos importados...`);
            verseBatch = [];
          }
        }
      }
    }

    // Inserir versículos restantes
    if (verseBatch.length > 0) {
      await verseRepo.save(verseBatch);
    }

    console.log(`\n✅ Importação concluída!`);
    console.log(`📊 Total de versículos importados: ${totalVerses}`);
  } catch (error) {
    console.error('❌ Erro na importação:', error);
  } finally {
    await dataSource.destroy();
  }
}

// Executar
const jsonFile = process.argv[2] || path.join(__dirname, 'data', 'bible-nvi.json');
importBible(jsonFile);

