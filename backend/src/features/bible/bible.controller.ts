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

  @Get('info')
  @ApiOperation({ summary: 'Get API information and available IDs' })
  @ApiResponse({ status: 200, description: 'Returns API info with all available translations and books' })
  async getInfo() {
    const translations = await this.bibleService.getTranslations();
    const books = await this.bibleService.getBooks();

    return {
      message: 'Ler Bíblia API - Informações de IDs Disponíveis',
      translations: translations.map(t => ({
        id: t.id,
        code: t.code,
        name: t.name,
        language: t.language,
        hasVerses: t.id === 1, // Apenas NVI tem versículos
      })),
      books: books.map(b => ({
        id: b.id,
        name: b.name,
        abbreviation: b.abbreviation,
        order: b.order,
        testament: b.testament,
      })),
      examples: {
        getTranslations: 'GET /v1/bible/translations',
        getBooks: 'GET /v1/bible/books',
        getChapter: 'GET /v1/bible/chapter?translationId=1&bookId=1&chapter=1',
        getVerse: 'GET /v1/bible/verse?translationId=1&bookId=1&chapter=1&verse=1',
        getInfo: 'GET /v1/bible/info',
      },
      notes: [
        '⚠️ translationId: Use 1 para NVI (única tradução com versículos importados)',
        '⚠️ bookId: Use valores de 1 a 66 (veja lista "books" acima)',
        '💡 Exemplo: Oséias = bookId 28 (não 94!)',
        '💡 Gênesis = bookId 1',
        '💡 João = bookId 43',
      ],
    };
  }
}

