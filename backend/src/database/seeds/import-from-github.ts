import { DataSource } from 'typeorm';
import { Verse } from '../../features/bible/entities/verse.entity';
import { Book } from '../../features/bible/entities/book.entity';
import { Translation } from '../../features/bible/entities/translation.entity';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Script para importar a Bíblia do repositório GitHub
 * Fonte: https://raw.githubusercontent.com/thiagobodruk/bible/master/json/
 *
 * Como usar:
 * npx ts-node src/database/seeds/import-from-github.ts nvi
 */

const GITHUB_BASE = 'https://raw.githubusercontent.com/thiagobodruk/bible/master/json';

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

// Mapeamento de abreviações do GitHub para abreviações do nosso banco
const GITHUB_ABBREV_TO_DB_ABBREV: { [key: string]: string } = {
  'gn': 'Gn', 'ex': 'Êx', 'lv': 'Lv', 'nm': 'Nm', 'dt': 'Dt', 'js': 'Js', 'jz': 'Jz', 'rt': 'Rt',
  '1sm': '1Sm', '2sm': '2Sm', '1rs': '1Rs', '2rs': '2Rs', '1cr': '1Cr', '2cr': '2Cr', 'ed': 'Ed',
  'ne': 'Ne', 'et': 'Et', 'jó': 'Jó', 'sl': 'Sl', 'pv': 'Pv', 'ec': 'Ec', 'ct': 'Ct',
  'is': 'Is', 'jr': 'Jr', 'lm': 'Lm', 'ez': 'Ez', 'dn': 'Dn', 'os': 'Os', 'jl': 'Jl',
  'am': 'Am', 'ob': 'Ob', 'jn': 'Jn', 'mq': 'Mq', 'na': 'Na', 'hc': 'Hc', 'sf': 'Sf',
  'ag': 'Ag', 'zc': 'Zc', 'ml': 'Ml', 'mt': 'Mt', 'mc': 'Mc', 'lc': 'Lc', 'jo': 'Jo',
  'atos': 'At', 'at': 'At', 'rm': 'Rm', '1co': '1Co', '2co': '2Co', 'gl': 'Gl', 'ef': 'Ef', 'fp': 'Fp',
  'cl': 'Cl', '1ts': '1Ts', '2ts': '2Ts', '1tm': '1Tm', '2tm': '2Tm', 'tt': 'Tt', 'fm': 'Fm',
  'hb': 'Hb', 'tg': 'Tg', '1pe': '1Pe', '2pe': '2Pe', '1jo': '1Jo', '2jo': '2Jo', '3jo': '3Jo',
  'jd': 'Jd', 'ap': 'Ap',
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

    // Buscar todos os livros do banco para mapear por abreviação
    const allBooks = await bookRepo.find();
    const booksByAbbrev: { [key: string]: Book } = {};
    allBooks.forEach(book => {
      booksByAbbrev[book.abbreviation] = book;
    });

    // Processar cada livro
    for (const bookData of bibleData) {
      const githubAbbrev = bookData.abbrev?.toLowerCase() || '';
      const dbAbbrev = GITHUB_ABBREV_TO_DB_ABBREV[githubAbbrev];

      if (!dbAbbrev) {
        console.log(`⚠️  Livro não mapeado: abreviação GitHub '${githubAbbrev}'`);
        continue;
      }

      const book = booksByAbbrev[dbAbbrev];
      if (!book) {
        console.log(`⚠️  Livro não encontrado no banco: '${dbAbbrev}'`);
        continue;
      }

      console.log(`📖 Importando: ${book.name} (${bookData.chapters.length} capítulos)`);

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
            bookId: book.id,
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

