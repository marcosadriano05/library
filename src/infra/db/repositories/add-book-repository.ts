import { AddBookRepository } from '../../../application/protocols/db'
import { Book } from '../../../domain/entities'

import { BookRepository } from './book-repository'

export class AddBookRepositoryImpl implements AddBookRepository {
  constructor (private bookRepository: BookRepository) {}

  async add(book: Book) {
    const addedBook: Book = await this.bookRepository.save(book)
    return addedBook
  }
}
