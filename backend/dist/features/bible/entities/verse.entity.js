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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Verse = void 0;
const typeorm_1 = require("typeorm");
const translation_entity_1 = require("./translation.entity");
let Verse = class Verse {
    id;
    translationId;
    bookId;
    chapter;
    verse;
    text;
    translation;
};
exports.Verse = Verse;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Verse.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Verse.prototype, "translationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Verse.prototype, "bookId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Verse.prototype, "chapter", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Verse.prototype, "verse", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Verse.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => translation_entity_1.Translation, (translation) => translation.verses),
    (0, typeorm_1.JoinColumn)({ name: 'translationId' }),
    __metadata("design:type", translation_entity_1.Translation)
], Verse.prototype, "translation", void 0);
exports.Verse = Verse = __decorate([
    (0, typeorm_1.Entity)('verses'),
    (0, typeorm_1.Index)(['translationId', 'bookId', 'chapter', 'verse']),
    (0, typeorm_1.Index)(['translationId', 'bookId', 'chapter'])
], Verse);
//# sourceMappingURL=verse.entity.js.map