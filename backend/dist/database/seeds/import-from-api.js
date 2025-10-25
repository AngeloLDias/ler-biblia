"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const verse_entity_1 = require("../../features/bible/entities/verse.entity");
const book_entity_1 = require("../../features/bible/entities/book.entity");
const translation_entity_1 = require("../../features/bible/entities/translation.entity");
const axios_1 = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const API_BASE = 'https://www.abibliadigital.com.br/api';
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
const BOOK_ID_MAP = {
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
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function importBibleFromAPI(translationCode) {
    await dataSource.initialize();
    console.log('📖 Iniciando importação da Bíblia da API...');
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
        const books = await bookRepo.find({ order: { order: 'ASC' } });
        console.log(`📚 Total de livros: ${books.length}`);
        let totalVerses = 0;
        const batchSize = 500;
        let verseBatch = [];
        for (const book of books) {
            console.log(`\n📖 Importando: ${book.name} (${book.chapters} capítulos)`);
            for (let chapter = 1; chapter <= book.chapters; chapter++) {
                try {
                    const url = `${API_BASE}/verses/${translationCode}/${book.abbreviation.toLowerCase()}/${chapter}`;
                    console.log(`  📄 Capítulo ${chapter}...`);
                    const response = await axios_1.default.get(url);
                    const chapterData = response.data;
                    if (!chapterData.verses || chapterData.verses.length === 0) {
                        console.log(`    ⚠️  Sem versículos`);
                        continue;
                    }
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
                    if (verseBatch.length >= batchSize) {
                        await verseRepo.save(verseBatch);
                        console.log(`    ✓ ${totalVerses} versículos salvos...`);
                        verseBatch = [];
                    }
                    await sleep(100);
                }
                catch (error) {
                    console.error(`    ❌ Erro no capítulo ${chapter}:`, error.message);
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
        console.error('❌ Erro na importação:', error);
    }
    finally {
        await dataSource.destroy();
    }
}
const translationCode = process.argv[2] || 'nvi';
console.log(`\n🚀 Importando tradução: ${translationCode.toUpperCase()}\n`);
importBibleFromAPI(translationCode);
//# sourceMappingURL=import-from-api.js.map