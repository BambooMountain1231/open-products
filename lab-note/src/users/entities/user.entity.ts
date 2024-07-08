import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Factory } from 'nestjs-seeder';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  @Factory('tester')
  username: string;

  @Column()
  @Factory('hogehoge')
  stNumber: string;

  @Column()
  @Factory('test')
  password: string;

  @CreateDateColumn()
  createDate?: Date;

  @UpdateDateColumn()
  updateDate?: Date;

  constructor(username: string, stNumber: string, password: string) {
    this.username = username;
    this.stNumber = stNumber;
    this.password = password;
  }
}
