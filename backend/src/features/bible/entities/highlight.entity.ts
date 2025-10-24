import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('highlights')
export class Highlight {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  verseId: number;

  @Column()
  color: string; // e.g., 'yellow', 'green', 'blue', 'red'

  @Column({ nullable: true })
  userId: number; // For future multi-user support

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

