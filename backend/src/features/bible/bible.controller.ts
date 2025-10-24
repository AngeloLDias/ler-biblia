import { Controller, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BibleService } from './bible.service';
import { GetChapterDto } from './dto/get-chapter.dto';

@ApiTags('bible')
@Controller('v1/bible')
export class BibleController {
  constructor(private readonly bibleService: BibleService) {}

  @Get('translations')
  @ApiOperation({ summary: 'Get all active translations' })
  @ApiResponse({ status: 200, description: 'Returns all active translations' })
  async getTranslations() {
    return this.bibleService.getTranslations();
  }

  @Get('books')
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Returns all books' })
  async getBooks(@Query('testament') testament?: string) {
    return this.bibleService.getBooks(testament);
  }

  @Get('books/:id')
  @ApiOperation({ summary: 'Get a specific book' })
  @ApiResponse({ status: 200, description: 'Returns a book' })
  async getBook(@Param('id', ParseIntPipe) id: number) {
    return this.bibleService.getBook(id);
  }

  @Get('chapter')
  @ApiOperation({ summary: 'Get all verses from a chapter' })
  @ApiResponse({ status: 200, description: 'Returns all verses from a chapter' })
  async getChapter(@Query() query: GetChapterDto) {
    return this.bibleService.getChapter(
      query.translationId,
      query.bookId,
      query.chapter,
    );
  }

  @Get('verse')
  @ApiOperation({ summary: 'Get a specific verse' })
  @ApiResponse({ status: 200, description: 'Returns a specific verse' })
  async getVerse(
    @Query('translationId', ParseIntPipe) translationId: number,
    @Query('bookId', ParseIntPipe) bookId: number,
    @Query('chapter', ParseIntPipe) chapter: number,
    @Query('verse', ParseIntPipe) verse: number,
  ) {
    return this.bibleService.getVerse(translationId, bookId, chapter, verse);
  }
}

