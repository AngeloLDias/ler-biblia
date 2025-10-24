import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // e.g., 'Genesis', 'Gênesis'

  @Column({ unique: true })
  abbreviation: string; // e.g., 'Gn', 'Gen'

  @Column()
  testament: string; // 'OT' or 'NT'

  @Column()
  order: number; // 1-66

  @Column()
  chapters: number; // Total number of chapters
}

