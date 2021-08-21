import { EditBook } from '../../domain/usecases'
import { Book } from '../../domain/entities'
import { EditBookRepository } from '../protocols/db'
import { FetchBookRepository } from '../protocols/db'

export class EditBookService implements EditBook {
  constructor (
    private editBookRepository: EditBookRepository,
    private fetchBookRepository: FetchBookRepository
  ) {}

  async exec (id: string, { title, publisher, photo, authors, description, price}: Book) {
    if (!id) {
      throw new Error("Missing route param")
    }

    if (!title || !publisher || !photo || !authors || !description || !price) {
      throw new Error("Missing params")
    }

    const isParamsStrings = typeof title === 'string' 
      && typeof publisher === 'string' 
      && typeof photo === 'string'
      && typeof description === 'string'
      && typeof price === 'number'

    if (!isParamsStrings) {
      throw new Error("Incorrect params type")
    }

    const isAuthorsStringArray = Array.isArray(authors) 
      && authors.every(author => typeof author === 'string')
    
    if (!isAuthorsStringArray) {
      throw new Error("Params must be type string")
    }

    await this.editBookRepository.edit({ id, title, publisher, photo, authors, description, price })
    
    const book = await this.fetchBookRepository.fetch(id)

    if (!book) {
      throw new Error("Error to update in database")
    }

    return book
  }
}
