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
exports.BibleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const translation_entity_1 = require("./entities/translation.entity");
const book_entity_1 = require("./entities/book.entity");
const verse_entity_1 = require("./entities/verse.entity");
let BibleService = class BibleService {
    translationRepo;
    bookRepo;
    verseRepo;
    constructor(translationRepo, bookRepo, verseRepo) {
        this.translationRepo = translationRepo;
        this.bookRepo = bookRepo;
        this.verseRepo = verseRepo;
    }
    async getTranslations() {
        return this.translationRepo.find({
            where: { isActive: true },
            order: { code: 'ASC' },
        });
    }
    async getBooks(testament) {
        const where = testament ? { testament } : {};
        return this.bookRepo.find({
            where,
            order: { order: 'ASC' },
        });
    }
    async getBook(id) {
        return this.bookRepo.findOne({ where: { id } });
    }
    async getChapter(translationId, bookId, chapter) {
        return this.verseRepo.find({
            where: { translationId, bookId, chapter },
            order: { verse: 'ASC' },
        });
    }
    async getVerse(translationId, bookId, chapter, verse) {
        return this.verseRepo.findOne({
            where: { translationId, bookId, chapter, verse },
        });
    }
};
exports.BibleService = BibleService;
exports.BibleService = BibleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(translation_entity_1.Translation)),
    __param(1, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __param(2, (0, typeorm_1.InjectRepository)(verse_entity_1.Verse)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BibleService);
//# sourceMappingURL=bible.service.js.map