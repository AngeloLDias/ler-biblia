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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const verse_entity_1 = require("../bible/entities/verse.entity");
const book_entity_1 = require("../bible/entities/book.entity");
let SearchService = class SearchService {
    verseRepo;
    bookRepo;
    constructor(verseRepo, bookRepo) {
        this.verseRepo = verseRepo;
        this.bookRepo = bookRepo;
    }
    async search(searchDto) {
        const { query, translationId, testament, bookId } = searchDto;
        const where = {
            text: (0, typeorm_2.Like)(`%${query}%`),
        };
        if (translationId) {
            where.translationId = translationId;
        }
        if (bookId) {
            where.bookId = bookId;
        }
        let bookIds;
        if (testament) {
            const books = await this.bookRepo.find({ where: { testament } });
            bookIds = books.map(b => b.id);
            if (bookIds.length > 0) {
                if (bookId && !bookIds.includes(bookId)) {
                    return [];
                }
                if (!bookId) {
                    where.bookId = bookIds.length === 1 ? bookIds[0] : undefined;
                    if (bookIds.length > 1) {
                        delete where.bookId;
                    }
                }
            }
        }
        const queryBuilder = this.verseRepo.createQueryBuilder('verse');
        queryBuilder.where('verse.text LIKE :query', { query: `%${query}%` });
        if (translationId) {
            queryBuilder.andWhere('verse.translationId = :translationId', { translationId });
        }
        if (bookId) {
            queryBuilder.andWhere('verse.bookId = :bookId', { bookId });
        }
        else if (bookIds && bookIds.length > 1) {
            queryBuilder.andWhere('verse.bookId IN (:...bookIds)', { bookIds });
        }
        queryBuilder.orderBy('verse.bookId', 'ASC')
            .addOrderBy('verse.chapter', 'ASC')
            .addOrderBy('verse.verse', 'ASC')
            .limit(100);
        return queryBuilder.getMany();
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(verse_entity_1.Verse)),
    __param(1, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SearchService);
//# sourceMappingURL=search.service.js.map