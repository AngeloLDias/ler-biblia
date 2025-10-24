import { Controller, Get, Post, Put, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { CreateHighlightDto } from './dto/create-highlight.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@ApiTags('notes')
@Controller('v1/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  // Highlights
  @Post('highlights')
  @ApiOperation({ summary: 'Create a highlight' })
  @ApiResponse({ status: 201, description: 'Highlight created' })
  async createHighlight(@Body() dto: CreateHighlightDto) {
    return this.notesService.createHighlight(dto);
  }

  @Get('highlights')
  @ApiOperation({ summary: 'Get highlights' })
  @ApiResponse({ status: 200, description: 'Returns highlights' })
  async getHighlights(
    @Query('verseId', new ParseIntPipe({ optional: true })) verseId?: number,
    @Query('color') color?: string,
  ) {
    return this.notesService.getHighlights(verseId, color);
  }

  @Delete('highlights/:id')
  @ApiOperation({ summary: 'Delete a highlight' })
  @ApiResponse({ status: 200, description: 'Highlight deleted' })
  async deleteHighlight(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.deleteHighlight(id);
  }

  // Notes
  @Post()
  @ApiOperation({ summary: 'Create a note' })
  @ApiResponse({ status: 201, description: 'Note created' })
  async createNote(@Body() dto: CreateNoteDto) {
    return this.notesService.createNote(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get notes' })
  @ApiResponse({ status: 200, description: 'Returns notes' })
  async getNotes(
    @Query('verseId', new ParseIntPipe({ optional: true })) verseId?: number,
    @Query('tag') tag?: string,
  ) {
    return this.notesService.getNotes(verseId, tag);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific note' })
  @ApiResponse({ status: 200, description: 'Returns a note' })
  async getNote(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.getNote(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a note' })
  @ApiResponse({ status: 200, description: 'Note updated' })
  async updateNote(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNoteDto,
  ) {
    return this.notesService.updateNote(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a note' })
  @ApiResponse({ status: 200, description: 'Note deleted' })
  async deleteNote(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.deleteNote(id);
  }
}

