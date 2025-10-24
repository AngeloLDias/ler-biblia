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
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const highlight_entity_1 = require("../bible/entities/highlight.entity");
const note_entity_1 = require("../bible/entities/note.entity");
let NotesService = class NotesService {
    highlightRepo;
    noteRepo;
    constructor(highlightRepo, noteRepo) {
        this.highlightRepo = highlightRepo;
        this.noteRepo = noteRepo;
    }
    async createHighlight(dto) {
        const highlight = this.highlightRepo.create(dto);
        return this.highlightRepo.save(highlight);
    }
    async getHighlights(verseId, color) {
        const where = {};
        if (verseId)
            where.verseId = verseId;
        if (color)
            where.color = color;
        return this.highlightRepo.find({ where, order: { createdAt: 'DESC' } });
    }
    async deleteHighlight(id) {
        const result = await this.highlightRepo.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Highlight with ID ${id} not found`);
        }
        return { deleted: true };
    }
    async createNote(dto) {
        const note = this.noteRepo.create(dto);
        return this.noteRepo.save(note);
    }
    async getNotes(verseId, tag) {
        const queryBuilder = this.noteRepo.createQueryBuilder('note');
        if (verseId) {
            queryBuilder.where('note.verseId = :verseId', { verseId });
        }
        if (tag) {
            queryBuilder.andWhere('note.tags LIKE :tag', { tag: `%${tag}%` });
        }
        return queryBuilder.orderBy('note.createdAt', 'DESC').getMany();
    }
    async getNote(id) {
        const note = await this.noteRepo.findOne({ where: { id } });
        if (!note) {
            throw new common_1.NotFoundException(`Note with ID ${id} not found`);
        }
        return note;
    }
    async updateNote(id, dto) {
        const note = await this.getNote(id);
        Object.assign(note, dto);
        return this.noteRepo.save(note);
    }
    async deleteNote(id) {
        const result = await this.noteRepo.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Note with ID ${id} not found`);
        }
        return { deleted: true };
    }
};
exports.NotesService = NotesService;
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(highlight_entity_1.Highlight)),
    __param(1, (0, typeorm_1.InjectRepository)(note_entity_1.Note)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], NotesService);
//# sourceMappingURL=notes.service.js.map