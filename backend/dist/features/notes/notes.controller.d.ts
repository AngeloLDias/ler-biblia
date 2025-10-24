import { NotesService } from './notes.service';
import { CreateHighlightDto } from './dto/create-highlight.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
export declare class NotesController {
    private readonly notesService;
    constructor(notesService: NotesService);
    createHighlight(dto: CreateHighlightDto): Promise<import("../bible/entities/highlight.entity").Highlight>;
    getHighlights(verseId?: number, color?: string): Promise<import("../bible/entities/highlight.entity").Highlight[]>;
    deleteHighlight(id: number): Promise<{
        deleted: boolean;
    }>;
    createNote(dto: CreateNoteDto): Promise<import("../bible/entities/note.entity").Note>;
    getNotes(verseId?: number, tag?: string): Promise<import("../bible/entities/note.entity").Note[]>;
    getNote(id: number): Promise<import("../bible/entities/note.entity").Note>;
    updateNote(id: number, dto: UpdateNoteDto): Promise<import("../bible/entities/note.entity").Note>;
    deleteNote(id: number): Promise<{
        deleted: boolean;
    }>;
}
