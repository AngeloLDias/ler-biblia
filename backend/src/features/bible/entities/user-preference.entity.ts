import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user_preferences')
export class UserPreference {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number; // For future multi-user support, null for local storage

  @Column({ nullable: true })
  defaultTranslationId: number;

  @Column({ default: 'light' })
  theme: string; // 'light' or 'dark'

  @Column({ default: 16 })
  fontSize: number;

  @Column('simple-json', { nullable: true })
  lastRead: {
    bookId: number;
    chapter: number;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

