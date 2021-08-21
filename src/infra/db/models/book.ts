import { Book } from '../../../domain/entities/book'

import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity("book")
class BookModel implements Book {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  publisher: string

  @Column()
  photo: string

  @Column()
  authors: Array<string>

  @Column()
  price: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

}

export { BookModel }