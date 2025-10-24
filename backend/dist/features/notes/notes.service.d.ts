import { Repository } from 'typeorm';
import { Highlight } from '../bible/entities/highlight.entity';
import { Note } from '../bible/entities/note.entity';
import { CreateHighlightDto } from './dto/create-highlight.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
export declare class NotesService {
    private highlightRepo;
    private noteRepo;
    constructor(highlightRepo: Repository<Highlight>, noteRepo: Repository<Note>);
    createHighlight(dto: CreateHighlightDto): Promise<Highlight>;
    getHighlights(verseId?: number, color?: string): Promise<Highlight[]>;
    deleteHighlight(id: number): Promise<{
        deleted: boolean;
    }>;
    createNote(dto: CreateNoteDto): Promise<Note>;
    getNotes(verseId?: number, tag?: string): Promise<Note[]>;
    getNote(id: number): Promise<Note>;
    updateNote(id: number, dto: UpdateNoteDto): Promise<Note>;
    deleteNote(id: number): Promise<{
        deleted: boolean;
    }>;
}
