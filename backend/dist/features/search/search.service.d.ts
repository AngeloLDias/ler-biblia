import { Repository } from 'typeorm';
import { Verse } from '../bible/entities/verse.entity';
import { Book } from '../bible/entities/book.entity';
import { SearchQueryDto } from './dto/search-query.dto';
export declare class SearchService {
    private verseRepo;
    private bookRepo;
    constructor(verseRepo: Repository<Verse>, bookRepo: Repository<Book>);
    search(searchDto: SearchQueryDto): Promise<Verse[]>;
}
