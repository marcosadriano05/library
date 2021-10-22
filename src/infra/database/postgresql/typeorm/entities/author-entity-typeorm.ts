import { Author } from "../../../../../domain/entities/author-entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm'
import { BookEntity } from "./book-entity-typeorm";

@Entity('author')
export class AuthorEntity implements Author {
  
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @ManyToMany(type => BookEntity, book => book.id)
  books: BookEntity[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}