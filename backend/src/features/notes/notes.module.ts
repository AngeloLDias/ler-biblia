import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { Highlight } from '../bible/entities/highlight.entity';
import { Note } from '../bible/entities/note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Highlight, Note])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}

