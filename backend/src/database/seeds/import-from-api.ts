import { DataSource } from 'typeorm';
import { Verse } from '../../features/bible/entities/verse.entity';
import { Book } from '../../features/bible/entities/book.entity';
import { Translation } from '../../features/bible/entities/translation.entity';
import axios from 'axios';

/**
 * Script para importar a Bíblia completa da API Bíblia Digital
 * 
 * Como usar:
 * 1. Execute: npm run seed (para criar traduções e livros)
 * 2. Execute: npx ts-node src/database/seeds/import-from-api.ts nvi
 * 
 * Traduções disponíveis: nvi, acf, arc, aa
 */

const API_BASE = 'https://www.abibliadigital.com.br/api';

const dataSource = new DataSource({
  type: 'sqlite',
  database: 'bible.db',
  entities: [Translation, Book, Verse],
  synchronize: false,
});

// Mapeamento de IDs da API para IDs do nosso banco
const BOOK_ID_MAP: { [key: string]: number } = {
  'gn': 1, 'ex': 2, 'lv': 3, 'nm': 4, 'dt': 5, 'js': 6, 'jz': 7, 'rt': 8,
  '1sm': 9, '2sm': 10, '1rs': 11, '2rs': 12, '1cr': 13, '2cr': 14, 'ed': 15,
  'ne': 16, 'et': 17, 'job': 18, 'sl': 19, 'pv': 20, 'ec': 21, 'ct': 22,
  'is': 23, 'jr': 24, 'lm': 25, 'ez': 26, 'dn': 27, 'os': 28, 'jl': 29,
  'am': 30, 'ob': 31, 'jn': 32, 'mq': 33, 'na': 34, 'hc': 35, 'sf': 36,
  'ag': 37, 'zc': 38, 'ml': 39, 'mt': 40, 'mc': 41, 'lc': 42, 'jo': 43,
  'at': 44, 'rm': 45, '1co': 46, '2co': 47, 'gl': 48, 'ef': 49, 'fp': 50,
  'cl': 51, '1ts': 52, '2ts': 53, '1tm': 54, '2tm': 55, 'tt': 56, 'fm': 57,
  'hb': 58, 'tg': 59, '1pe': 60, '2pe': 61, '1jo': 62, '2jo': 63, '3jo': 64,
  'jd': 65, 'ap': 66,
};

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function importBibleFromAPI(translationCode: string) {
  await dataSource.initialize();
  console.log('📖 Iniciando importação da Bíblia da API...');

  try {
    const verseRepo = dataSource.getRepository(Verse);
    const translationRepo = dataSource.getRepository(Translation);
    const bookRepo = dataSource.getRepository(Book);

    // Buscar tradução
    const translation = await translationRepo.findOne({
      where: { code: translationCode.toUpperCase() },
    });

    if (!translation) {
      console.log(`❌ Tradução ${translationCode.toUpperCase()} não encontrada.`);
      console.log('Execute o seed primeiro: npm run seed');
      return;
    }

    console.log(`✅ Tradução: ${translation.name}`);

    // Buscar todos os livros
    const books = await bookRepo.find({ order: { order: 'ASC' } });
    console.log(`📚 Total de livros: ${books.length}`);

    let totalVerses = 0;
    const batchSize = 500;
    let verseBatch: any[] = [];

    // Importar cada livro
    for (const book of books) {
      console.log(`\n📖 Importando: ${book.name} (${book.chapters} capítulos)`);

      // Importar cada capítulo
      for (let chapter = 1; chapter <= book.chapters; chapter++) {
        try {
          // Fazer requisição para a API
          const url = `${API_BASE}/verses/${translationCode}/${book.abbreviation.toLowerCase()}/${chapter}`;
          console.log(`  📄 Capítulo ${chapter}...`);
          
          const response = await axios.get(url);
          const chapterData = response.data;

          if (!chapterData.verses || chapterData.verses.length === 0) {
            console.log(`    ⚠️  Sem versículos`);
            continue;
          }

          // Adicionar versículos ao batch
          for (const verseData of chapterData.verses) {
            verseBatch.push({
              translationId: translation.id,
              bookId: book.id,
              chapter: chapter,
              verse: verseData.number,
              text: verseData.text,
            });

            totalVerses++;
          }

          // Salvar batch se atingiu o tamanho
          if (verseBatch.length >= batchSize) {
            await verseRepo.save(verseBatch);
            console.log(`    ✓ ${totalVerses} versículos salvos...`);
            verseBatch = [];
          }

          // Delay para não sobrecarregar a API
          await sleep(100);

        } catch (error: any) {
          console.error(`    ❌ Erro no capítulo ${chapter}:`, error.message);
        }
      }
    }

    // Salvar versículos restantes
    if (verseBatch.length > 0) {
      await verseRepo.save(verseBatch);
    }

    console.log(`\n✅ Importação concluída!`);
    console.log(`📊 Total de versículos importados: ${totalVerses}`);
    console.log(`📖 Tradução: ${translation.name}`);

  } catch (error) {
    console.error('❌ Erro na importação:', error);
  } finally {
    await dataSource.destroy();
  }
}

// Executar
const translationCode = process.argv[2] || 'nvi';
console.log(`\n🚀 Importando tradução: ${translationCode.toUpperCase()}\n`);
importBibleFromAPI(translationCode);

