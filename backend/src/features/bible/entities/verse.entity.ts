import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Translation } from './translation.entity';

@Entity('verses')
@Index(['translationId', 'bookId', 'chapter', 'verse'])
@Index(['translationId', 'bookId', 'chapter'])
export class Verse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  translationId: number;

  @Column()
  bookId: number;

  @Column()
  chapter: number;

  @Column()
  verse: number;

  @Column('text')
  text: string;

  @ManyToOne(() => Translation, (translation) => translation.verses)
  @JoinColumn({ name: 'translationId' })
  translation: Translation;
}

