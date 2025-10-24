"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const bible_module_1 = require("./features/bible/bible.module");
const search_module_1 = require("./features/search/search.module");
const notes_module_1 = require("./features/notes/notes.module");
const plans_module_1 = require("./features/plans/plans.module");
const translation_entity_1 = require("./features/bible/entities/translation.entity");
const book_entity_1 = require("./features/bible/entities/book.entity");
const verse_entity_1 = require("./features/bible/entities/verse.entity");
const highlight_entity_1 = require("./features/bible/entities/highlight.entity");
const note_entity_1 = require("./features/bible/entities/note.entity");
const reading_plan_entity_1 = require("./features/bible/entities/reading-plan.entity");
const reading_progress_entity_1 = require("./features/bible/entities/reading-progress.entity");
const user_preference_entity_1 = require("./features/bible/entities/user-preference.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'bible.db',
                entities: [
                    translation_entity_1.Translation,
                    book_entity_1.Book,
                    verse_entity_1.Verse,
                    highlight_entity_1.Highlight,
                    note_entity_1.Note,
                    reading_plan_entity_1.ReadingPlan,
                    reading_progress_entity_1.ReadingProgress,
                    user_preference_entity_1.UserPreference,
                ],
                synchronize: true,
                logging: false,
            }),
            bible_module_1.BibleModule,
            search_module_1.SearchModule,
            notes_module_1.NotesModule,
            plans_module_1.PlansModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map