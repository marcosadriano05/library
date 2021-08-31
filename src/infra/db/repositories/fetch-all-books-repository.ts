import { FetchAllBooksRepository } from '../../../application/protocols/db'
import { Book } from '../../../domain/entities'

import { BookRepository } from './book-repository'

export class FetchAllBooksRepositoryImpl implements FetchAllBooksRepository {
  constructor (private bookRepository: BookRepository) {}

  async fetch() {
    const books = await this.bookRepository.find()
    return books as unknown as Book[]
  }
}
