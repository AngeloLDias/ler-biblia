"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BibleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bible_service_1 = require("./bible.service");
const get_chapter_dto_1 = require("./dto/get-chapter.dto");
let BibleController = class BibleController {
    bibleService;
    constructor(bibleService) {
        this.bibleService = bibleService;
    }
    async getTranslations() {
        return this.bibleService.getTranslations();
    }
    async getBooks(testament) {
        return this.bibleService.getBooks(testament);
    }
    async getBook(id) {
        return this.bibleService.getBook(id);
    }
    async getChapter(query) {
        return this.bibleService.getChapter(query.translationId, query.bookId, query.chapter);
    }
    async getVerse(translationId, bookId, chapter, verse) {
        return this.bibleService.getVerse(translationId, bookId, chapter, verse);
    }
    async getInfo() {
        const translations = await this.bibleService.getTranslations();
        const books = await this.bibleService.getBooks();
        return {
            message: 'Ler Bíblia API - Informações de IDs Disponíveis',
            translations: translations.map(t => ({
                id: t.id,
                code: t.code,
                name: t.name,
                language: t.language,
                hasVerses: t.id === 1,
            })),
            books: books.map(b => ({
                id: b.id,
                name: b.name,
                abbreviation: b.abbreviation,
                order: b.order,
                testament: b.testament,
            })),
            examples: {
                getTranslations: 'GET /v1/bible/translations',
                getBooks: 'GET /v1/bible/books',
                getChapter: 'GET /v1/bible/chapter?translationId=1&bookId=1&chapter=1',
                getVerse: 'GET /v1/bible/verse?translationId=1&bookId=1&chapter=1&verse=1',
                getInfo: 'GET /v1/bible/info',
            },
            notes: [
                '⚠️ translationId: Use 1 para NVI (única tradução com versículos importados)',
                '⚠️ bookId: Use valores de 1 a 66 (veja lista "books" acima)',
                '💡 Exemplo: Oséias = bookId 28 (não 94!)',
                '💡 Gênesis = bookId 1',
                '💡 João = bookId 43',
            ],
        };
    }
};
exports.BibleController = BibleController;
__decorate([
    (0, common_1.Get)('translations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active translations' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns all active translations' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BibleController.prototype, "getTranslations", null);
__decorate([
    (0, common_1.Get)('books'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all books' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns all books' }),
    __param(0, (0, common_1.Query)('testament')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BibleController.prototype, "getBooks", null);
__decorate([
    (0, common_1.Get)('books/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific book' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns a book' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BibleController.prototype, "getBook", null);
__decorate([
    (0, common_1.Get)('chapter'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all verses from a chapter' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns all verses from a chapter' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_chapter_dto_1.GetChapterDto]),
    __metadata("design:returntype", Promise)
], BibleController.prototype, "getChapter", null);
__decorate([
    (0, common_1.Get)('verse'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific verse' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns a specific verse' }),
    __param(0, (0, common_1.Query)('translationId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('bookId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('chapter', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('verse', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], BibleController.prototype, "getVerse", null);
__decorate([
    (0, common_1.Get)('info'),
    (0, swagger_1.ApiOperation)({ summary: 'Get API information and available IDs' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns API info with all available translations and books' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BibleController.prototype, "getInfo", null);
exports.BibleController = BibleController = __decorate([
    (0, swagger_1.ApiTags)('bible'),
    (0, common_1.Controller)('v1/bible'),
    __metadata("design:paramtypes", [bible_service_1.BibleService])
], BibleController);
//# sourceMappingURL=bible.controller.js.map