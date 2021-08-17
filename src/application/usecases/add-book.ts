import { AddBook } from '../../domain/usecases'
import { Book } from '../../domain/entities'
import { AddBookRepository } from '../protocols/db'
import { UuidGenerator } from '../protocols/uuid'

export class AddBookService implements AddBook {
  constructor (
    private addBookRepository: AddBookRepository,
    private uuidGenerator: UuidGenerator
  ) {}

  async exec ({ title, publisher, photo, authors, description, price }: Book) {
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
      throw new Error("Params must be an array of type string")
    }

    const id: string = this.uuidGenerator.generate();

    const addedBook = await this.addBookRepository.add({ id, title, publisher, photo, authors, description, price })

    if (!addedBook) {
      throw new Error("Error to save in database")
    }

    return addedBook
  }
}
