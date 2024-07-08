import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Factory } from 'nestjs-seeder';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @Factory('オープンラボ')
  title: string;

  @Column()
  @Factory('新しいゼミ生を募集するイベント。6月ごろに開催予定。')
  content: string;

  @CreateDateColumn()
  createDate?: Date;

  @UpdateDateColumn()
  updateDate?: Date;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}
