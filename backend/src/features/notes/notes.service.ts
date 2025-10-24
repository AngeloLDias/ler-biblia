import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Highlight } from '../bible/entities/highlight.entity';
import { Note } from '../bible/entities/note.entity';
import { CreateHighlightDto } from './dto/create-highlight.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Highlight)
    private highlightRepo: Repository<Highlight>,
    @InjectRepository(Note)
    private noteRepo: Repository<Note>,
  ) {}

  // Highlights
  async createHighlight(dto: CreateHighlightDto) {
    const highlight = this.highlightRepo.create(dto);
    return this.highlightRepo.save(highlight);
  }

  async getHighlights(verseId?: number, color?: string) {
    const where: any = {};
    if (verseId) where.verseId = verseId;
    if (color) where.color = color;
    
    return this.highlightRepo.find({ where, order: { createdAt: 'DESC' } });
  }

  async deleteHighlight(id: number) {
    const result = await this.highlightRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Highlight with ID ${id} not found`);
    }
    return { deleted: true };
  }

  // Notes
  async createNote(dto: CreateNoteDto) {
    const note = this.noteRepo.create(dto);
    return this.noteRepo.save(note);
  }

  async getNotes(verseId?: number, tag?: string) {
    const queryBuilder = this.noteRepo.createQueryBuilder('note');
    
    if (verseId) {
      queryBuilder.where('note.verseId = :verseId', { verseId });
    }
    
    if (tag) {
      queryBuilder.andWhere('note.tags LIKE :tag', { tag: `%${tag}%` });
    }
    
    return queryBuilder.orderBy('note.createdAt', 'DESC').getMany();
  }

  async getNote(id: number) {
    const note = await this.noteRepo.findOne({ where: { id } });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return note;
  }

  async updateNote(id: number, dto: UpdateNoteDto) {
    const note = await this.getNote(id);
    Object.assign(note, dto);
    return this.noteRepo.save(note);
  }

  async deleteNote(id: number) {
    const result = await this.noteRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return { deleted: true };
  }
}

