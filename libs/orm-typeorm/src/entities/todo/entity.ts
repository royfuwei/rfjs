import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EnumContentType } from './types';
import { SCHEMA } from '@/consts';

@Entity({
  name: 'todo',
  schema: SCHEMA,
})
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  content!: string;

  @Column({
    type: 'varchar',
    enum: EnumContentType,
    nullable: false,
    length: 100,
  })
  content_type!: EnumContentType;

  @Column({ type: 'boolean' })
  complete!: boolean;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;
}
