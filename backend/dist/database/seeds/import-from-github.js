"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const verse_entity_1 = require("../../features/bible/entities/verse.entity");
const book_entity_1 = require("../../features/bible/entities/book.entity");
const translation_entity_1 = require("../../features/bible/entities/translation.entity");
const axios_1 = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const GITHUB_BASE = 'https://raw.githubusercontent.com/thiagobodruk/bible/master/json';
const dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_DATABASE || 'ler_biblia',
    entities: [translation_entity_1.Translation, book_entity_1.Book, verse_entity_1.Verse],
    synchronize: false,
});
const GITHUB_ABBREV_TO_DB_ABBREV = {
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
const TRANSLATION_MAP = {
    'nvi': 'pt_nvi',
    'acf': 'pt_acf',
    'arc': 'pt_arc',
    'aa': 'pt_aa',
};
async function importBibleFromGitHub(translationCode) {
    await dataSource.initialize();
    console.log('📖 Iniciando importação da Bíblia do GitHub...');
    try {
        const verseRepo = dataSource.getRepository(verse_entity_1.Verse);
        const translationRepo = dataSource.getRepository(translation_entity_1.Translation);
        const bookRepo = dataSource.getRepository(book_entity_1.Book);
        const translation = await translationRepo.findOne({
            where: { code: translationCode.toUpperCase() },
        });
        if (!translation) {
            console.log(`❌ Tradução ${translationCode.toUpperCase()} não encontrada.`);
            console.log('Execute o seed primeiro: npm run seed');
            return;
        }
        console.log(`✅ Tradução: ${translation.name}`);
        const githubTranslation = TRANSLATION_MAP[translationCode.toLowerCase()] || 'pt_nvi';
        console.log(`📥 Baixando de: ${GITHUB_BASE}/${githubTranslation}.json`);
        const response = await axios_1.default.get(`${GITHUB_BASE}/${githubTranslation}.json`);
        const bibleData = response.data;
        console.log(`✅ Arquivo baixado com sucesso!`);
        console.log(`📚 Total de livros no arquivo: ${bibleData.length}`);
        let totalVerses = 0;
        const batchSize = 1000;
        let verseBatch = [];
        const allBooks = await bookRepo.find();
        const booksByAbbrev = {};
        allBooks.forEach(book => {
            booksByAbbrev[book.abbreviation] = book;
        });
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
            for (let chapterIndex = 0; chapterIndex < bookData.chapters.length; chapterIndex++) {
                const chapterNumber = chapterIndex + 1;
                const verses = bookData.chapters[chapterIndex];
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
                    if (verseBatch.length >= batchSize) {
                        await verseRepo.save(verseBatch);
                        console.log(`  ✓ ${totalVerses} versículos salvos...`);
                        verseBatch = [];
                    }
                }
            }
        }
        if (verseBatch.length > 0) {
            await verseRepo.save(verseBatch);
        }
        console.log(`\n✅ Importação concluída!`);
        console.log(`📊 Total de versículos importados: ${totalVerses}`);
        console.log(`📖 Tradução: ${translation.name}`);
    }
    catch (error) {
        console.error('❌ Erro na importação:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
    }
    finally {
        await dataSource.destroy();
    }
}
const translationCode = process.argv[2] || 'nvi';
console.log(`\n🚀 Importando tradução: ${translationCode.toUpperCase()}\n`);
importBibleFromGitHub(translationCode);
//# sourceMappingURL=import-from-github.js.map