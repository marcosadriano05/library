import { EditBook } from '../../domain/usecases'
import { Book } from '../../domain/entities'
import { EditBookRepository } from '../protocols/db'
import { FetchBookRepository } from '../protocols/db'

export class EditBookService implements EditBook {
  constructor (
    private editBookRepository: EditBookRepository,
    private fetchBookRepository: FetchBookRepository
  ) {}

  async exec (id: string, { title, publisher, photo, authors }: Book) {
    if (!id) {
      throw new Error("Missing route param")
    }

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
      throw new Error("Params must be type string")
    }

    await this.editBookRepository.edit(id, { title, publisher, photo, authors })
    
    const obra = await this.fetchBookRepository.fetch(id)

    if (!obra) {
      throw new Error("Error to update in database")
    }

    return obra
  }
}
