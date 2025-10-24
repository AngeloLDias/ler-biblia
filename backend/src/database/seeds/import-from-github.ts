import { DataSource } from 'typeorm';
import { Verse } from '../../features/bible/entities/verse.entity';
import { Book } from '../../features/bible/entities/book.entity';
import { Translation } from '../../features/bible/entities/translation.entity';
import axios from 'axios';

/**
 * Script para importar a Bíblia do repositório GitHub
 * Fonte: https://raw.githubusercontent.com/thiagobodruk/bible/master/json/
 * 
 * Como usar:
 * npx ts-node src/database/seeds/import-from-github.ts nvi
 */

const GITHUB_BASE = 'https://raw.githubusercontent.com/thiagobodruk/bible/master/json';

const dataSource = new DataSource({
  type: 'sqlite',
  database: 'bible.db',
  entities: [Translation, Book, Verse],
  synchronize: false,
});

// Mapeamento de abreviações para IDs dos livros
// IMPORTANTE: Os IDs começam em 67 porque o seed criou os livros com esses IDs
const BOOK_ABBREV_TO_ID: { [key: string]: number } = {
  'gn': 67, 'ex': 68, 'lv': 69, 'nm': 70, 'dt': 71, 'js': 72, 'jz': 73, 'rt': 74,
  '1sm': 75, '2sm': 76, '1rs': 77, '2rs': 78, '1cr': 79, '2cr': 80, 'ed': 81,
  'ne': 82, 'et': 83, 'jó': 84, 'sl': 85, 'pv': 86, 'ec': 87, 'ct': 88,
  'is': 89, 'jr': 90, 'lm': 91, 'ez': 92, 'dn': 93, 'os': 94, 'jl': 95,
  'am': 96, 'ob': 97, 'jn': 98, 'mq': 99, 'na': 100, 'hc': 101, 'sf': 102,
  'ag': 103, 'zc': 104, 'ml': 105, 'mt': 106, 'mc': 107, 'lc': 108, 'jo': 109,
  'at': 110, 'rm': 111, '1co': 112, '2co': 113, 'gl': 114, 'ef': 115, 'fp': 116,
  'cl': 117, '1ts': 118, '2ts': 119, '1tm': 120, '2tm': 121, 'tt': 122, 'fm': 123,
  'hb': 124, 'tg': 125, '1pe': 126, '2pe': 127, '1jo': 128, '2jo': 129, '3jo': 130,
  'jd': 131, 'ap': 132,
};

const TRANSLATION_MAP: { [key: string]: string } = {
  'nvi': 'pt_nvi',
  'acf': 'pt_acf',
  'arc': 'pt_arc',
  'aa': 'pt_aa',
};

async function importBibleFromGitHub(translationCode: string) {
  await dataSource.initialize();
  console.log('📖 Iniciando importação da Bíblia do GitHub...');

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

    // Mapear código da tradução
    const githubTranslation = TRANSLATION_MAP[translationCode.toLowerCase()] || 'pt_nvi';
    console.log(`📥 Baixando de: ${GITHUB_BASE}/${githubTranslation}.json`);

    // Baixar arquivo JSON completo
    const response = await axios.get(`${GITHUB_BASE}/${githubTranslation}.json`);
    const bibleData = response.data;

    console.log(`✅ Arquivo baixado com sucesso!`);
    console.log(`📚 Total de livros no arquivo: ${bibleData.length}`);

    let totalVerses = 0;
    const batchSize = 1000;
    let verseBatch: any[] = [];

    // Processar cada livro
    for (const bookData of bibleData) {
      const abbrev = bookData.abbrev?.toLowerCase() || '';
      const bookId = BOOK_ABBREV_TO_ID[abbrev];

      if (!bookId) {
        console.log(`⚠️  Livro não mapeado: abreviação '${abbrev}'`);
        continue;
      }

      // Buscar nome do livro no banco
      const book = await bookRepo.findOne({ where: { id: bookId } });
      const bookName = book?.name || `Livro ${bookId}`;

      console.log(`📖 Importando: ${bookName} (${bookData.chapters.length} capítulos)`);

      // Processar cada capítulo
      for (let chapterIndex = 0; chapterIndex < bookData.chapters.length; chapterIndex++) {
        const chapterNumber = chapterIndex + 1;
        const verses = bookData.chapters[chapterIndex];

        // Processar cada versículo
        for (let verseIndex = 0; verseIndex < verses.length; verseIndex++) {
          const verseNumber = verseIndex + 1;
          const verseText = verses[verseIndex];

          verseBatch.push({
            translationId: translation.id,
            bookId: bookId,
            chapter: chapterNumber,
            verse: verseNumber,
            text: verseText,
          });

          totalVerses++;

          // Salvar em lotes
          if (verseBatch.length >= batchSize) {
            await verseRepo.save(verseBatch);
            console.log(`  ✓ ${totalVerses} versículos salvos...`);
            verseBatch = [];
          }
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

  } catch (error: any) {
    console.error('❌ Erro na importação:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  } finally {
    await dataSource.destroy();
  }
}

// Executar
const translationCode = process.argv[2] || 'nvi';
console.log(`\n🚀 Importando tradução: ${translationCode.toUpperCase()}\n`);
importBibleFromGitHub(translationCode);

