import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('reading_plans')
export class ReadingPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // e.g., 'Bible in 1 Year'

  @Column('text')
  description: string;

  @Column()
  totalDays: number;

  @Column('simple-json')
  schedule: Array<{
    day: number;
    readings: Array<{
      bookId: number;
      startChapter: number;
      endChapter: number;
    }>;
  }>;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

