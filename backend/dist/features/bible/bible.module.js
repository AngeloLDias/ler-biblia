"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BibleModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bible_controller_1 = require("./bible.controller");
const bible_service_1 = require("./bible.service");
const translation_entity_1 = require("./entities/translation.entity");
const book_entity_1 = require("./entities/book.entity");
const verse_entity_1 = require("./entities/verse.entity");
let BibleModule = class BibleModule {
};
exports.BibleModule = BibleModule;
exports.BibleModule = BibleModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([translation_entity_1.Translation, book_entity_1.Book, verse_entity_1.Verse])],
        controllers: [bible_controller_1.BibleController],
        providers: [bible_service_1.BibleService],
        exports: [bible_service_1.BibleService],
    })
], BibleModule);
//# sourceMappingURL=bible.module.js.map