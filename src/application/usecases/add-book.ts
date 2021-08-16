import { AddBook } from '../../domain/usecases'
import { Book } from '../../domain/entities'
import { AddBookRepository } from '../protocols/db'

export class AddBookService implements AddBook {
  constructor (private addBookRepository: AddBookRepository) {}

  async exec ({ title, publisher, photo, authors }: Book) {
    if (!title || !publisher || !photo || !authors) {
      throw new Error("Missing params")
    }

    const isParamsStrings = typeof title === 'string' 
      && typeof publisher === 'string' 
      && typeof photo === 'string'

    if (!isParamsStrings) {
      throw new Error("Params must be type string")
    }

    const isAuthorsStringArray = Array.isArray(authors) 
      && authors.every(author => typeof author === 'string')
    
    if (!isAuthorsStringArray) {
      throw new Error("Params must be an array of type string")
    }

    const addedBook = await this.addBookRepository.add({ title, publisher, photo, authors })

    if (!addedBook) {
      throw new Error("Error to save in database")
    }

    return addedBook
  }
}
