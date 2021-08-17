import { FetchAllBooks } from '../../domain/usecases'
import { FetchAllBooksRepository } from '../protocols/db'

export class FetchBookService implements FetchAllBooks {
  constructor (private fetchAllBooksRepository: FetchAllBooksRepository) {}

  async exec () {
    const books = await this.fetchAllBooksRepository.fetch()

    if (!books) {
      throw new Error("Error to fetch the data in database")
    }

    return books
  }
}