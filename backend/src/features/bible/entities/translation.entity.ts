import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Verse } from './verse.entity';

@Entity('translations')
export class Translation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string; // e.g., 'NVI', 'ARC', 'KJV'

  @Column()
  name: string; // e.g., 'Nova Versão Internacional'

  @Column()
  language: string; // e.g., 'pt', 'en'

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Verse, (verse) => verse.translation)
  verses: Verse[];
}

