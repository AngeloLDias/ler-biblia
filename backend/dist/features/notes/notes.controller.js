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
exports.NotesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const notes_service_1 = require("./notes.service");
const create_highlight_dto_1 = require("./dto/create-highlight.dto");
const create_note_dto_1 = require("./dto/create-note.dto");
const update_note_dto_1 = require("./dto/update-note.dto");
let NotesController = class NotesController {
    notesService;
    constructor(notesService) {
        this.notesService = notesService;
    }
    async createHighlight(dto) {
        return this.notesService.createHighlight(dto);
    }
    async getHighlights(verseId, color) {
        return this.notesService.getHighlights(verseId, color);
    }
    async deleteHighlight(id) {
        return this.notesService.deleteHighlight(id);
    }
    async createNote(dto) {
        return this.notesService.createNote(dto);
    }
    async getNotes(verseId, tag) {
        return this.notesService.getNotes(verseId, tag);
    }
    async getNote(id) {
        return this.notesService.getNote(id);
    }
    async updateNote(id, dto) {
        return this.notesService.updateNote(id, dto);
    }
    async deleteNote(id) {
        return this.notesService.deleteNote(id);
    }
};
exports.NotesController = NotesController;
__decorate([
    (0, common_1.Post)('highlights'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a highlight' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Highlight created' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_highlight_dto_1.CreateHighlightDto]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "createHighlight", null);
__decorate([
    (0, common_1.Get)('highlights'),
    (0, swagger_1.ApiOperation)({ summary: 'Get highlights' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns highlights' }),
    __param(0, (0, common_1.Query)('verseId', new common_1.ParseIntPipe({ optional: true }))),
    __param(1, (0, common_1.Query)('color')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "getHighlights", null);
__decorate([
    (0, common_1.Delete)('highlights/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a highlight' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Highlight deleted' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "deleteHighlight", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a note' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Note created' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_note_dto_1.CreateNoteDto]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "createNote", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get notes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns notes' }),
    __param(0, (0, common_1.Query)('verseId', new common_1.ParseIntPipe({ optional: true }))),
    __param(1, (0, common_1.Query)('tag')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "getNotes", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific note' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns a note' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "getNote", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a note' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Note updated' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_note_dto_1.UpdateNoteDto]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "updateNote", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a note' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Note deleted' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotesController.prototype, "deleteNote", null);
exports.NotesController = NotesController = __decorate([
    (0, swagger_1.ApiTags)('notes'),
    (0, common_1.Controller)('v1/notes'),
    __metadata("design:paramtypes", [notes_service_1.NotesService])
], NotesController);
//# sourceMappingURL=notes.controller.js.map