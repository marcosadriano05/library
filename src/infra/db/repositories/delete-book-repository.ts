import { DeleteBookRepository } from '../../../application/protocols/db'

import { BookRepository } from './book-repository'

export class DeleteBookRepositoryAdapter implements DeleteBookRepository {
  constructor (private bookRepository: BookRepository) {}

  async delete(id: string) {
    await this.bookRepository.delete(id)
  }
}
