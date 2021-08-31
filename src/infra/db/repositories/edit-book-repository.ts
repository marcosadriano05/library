import { EditBookRepository } from '../../../application/protocols/db'
import { Book } from '../../../domain/entities'

import { BookRepository } from './book-repository'

export class EditBookRepositoryImpl implements EditBookRepository {
  constructor (private bookRepository: BookRepository) {}

  async edit(book: Book) {
    const { id } = book
    if (id) {
      const editedBook = await this.bookRepository.update(id, book)
      return editedBook as unknown as Book
    }
  }
}
