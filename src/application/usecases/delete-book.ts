import { DeleteBook } from '../../domain/usecases'
import { DeleteBookRepository } from '../protocols/db'
import { FetchBookRepository } from '../protocols/db'

export class DeleteBookService implements DeleteBook {
  constructor (
    private deleteBookRepository: DeleteBookRepository,
    private fetchBookRepository: FetchBookRepository
  ) {}

  async exec (id: string) {
    const book = await this.fetchBookRepository.fetch(id)

    if (!book) {
      throw new Error("Invalid route param")
    }

    await this.deleteBookRepository.delete(id)
  }
}