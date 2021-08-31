import { FetchBookRepository } from '../../../application/protocols/db'
import { Book } from '../../../domain/entities'

import { BookRepository } from './book-repository'

export class FetchBookRepositoryImpl implements FetchBookRepository {
  constructor (private bookRepository: BookRepository) {}

  async fetch(id: string) {
    const book = await this.bookRepository.findOne(id)
    return book as unknown as Book
  }
}
