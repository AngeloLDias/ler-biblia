import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('reading_progress')
export class ReadingProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  planId: number;

  @Column()
  day: number;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date | null;

  @Column({ nullable: true })
  userId: number; // For future multi-user support

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

