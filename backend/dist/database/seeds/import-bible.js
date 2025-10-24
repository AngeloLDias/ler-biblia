"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const verse_entity_1 = require("../../features/bible/entities/verse.entity");
const book_entity_1 = require("../../features/bible/entities/book.entity");
const translation_entity_1 = require("../../features/bible/entities/translation.entity");
const fs = require("fs");
const path = require("path");
const dataSource = new typeorm_1.DataSource({
    type: 'sqlite',
    database: 'bible.db',
    entities: [translation_entity_1.Translation, book_entity_1.Book, verse_entity_1.Verse],
    synchronize: false,
});
async function importBible(jsonFilePath) {
    await dataSource.initialize();
    console.log('📖 Iniciando importação da Bíblia...');
    try {
        const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
        const bibleData = JSON.parse(jsonData);
        const verseRepo = dataSource.getRepository(verse_entity_1.Verse);
        const translationRepo = dataSource.getRepository(translation_entity_1.Translation);
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
        let verseBatch = [];
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
                    if (verseBatch.length >= batchSize) {
                        await verseRepo.save(verseBatch);
                        console.log(`  ✓ ${totalVerses} versículos importados...`);
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
    }
    catch (error) {
        console.error('❌ Erro na importação:', error);
    }
    finally {
        await dataSource.destroy();
    }
}
const jsonFile = process.argv[2] || path.join(__dirname, 'data', 'bible-nvi.json');
importBible(jsonFile);
//# sourceMappingURL=import-bible.js.map