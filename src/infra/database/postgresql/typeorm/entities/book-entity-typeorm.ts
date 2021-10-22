import { Book } from "../../../../../domain/entities/book-entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm'
import { AuthorEntity } from "./author-entity-typeorm";

@Entity('book')
export class BookEntity implements Book {

  @PrimaryGeneratedColumn()
  id: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  price: number

  @Column()
  publisher: string

  @Column()
  photo: string

  @ManyToMany(type => AuthorEntity, author => author.id, { cascade: true, onDelete: 'CASCADE' })
  @JoinTable()
  authors: AuthorEntity[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}