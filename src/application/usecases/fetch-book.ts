import { FetchBook } from '../../domain/usecases'
import { FetchBookRepository } from '../protocols/db'

export class FetchBookService implements FetchBook {
  constructor (private fetchBookRepository: FetchBookRepository) {}

  async exec (id: string) {
    const obra = await this.fetchBookRepository.fetch(id)

    if (!obra) {
      throw new Error("Error to fetch the data in database")
    }

    return obra
  }
}