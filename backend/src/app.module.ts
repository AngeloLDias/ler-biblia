import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BibleModule } from './features/bible/bible.module';
import { SearchModule } from './features/search/search.module';
import { NotesModule } from './features/notes/notes.module';
import { PlansModule } from './features/plans/plans.module';
import { Translation } from './features/bible/entities/translation.entity';
import { Book } from './features/bible/entities/book.entity';
import { Verse } from './features/bible/entities/verse.entity';
import { Highlight } from './features/bible/entities/highlight.entity';
import { Note } from './features/bible/entities/note.entity';
import { ReadingPlan } from './features/bible/entities/reading-plan.entity';
import { ReadingProgress } from './features/bible/entities/reading-progress.entity';
import { UserPreference } from './features/bible/entities/user-preference.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'bible.db',
      entities: [
        Translation,
        Book,
        Verse,
        Highlight,
        Note,
        ReadingPlan,
        ReadingProgress,
        UserPreference,
      ],
      synchronize: true, // Only for development
      logging: false,
    }),
    BibleModule,
    SearchModule,
    NotesModule,
    PlansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
