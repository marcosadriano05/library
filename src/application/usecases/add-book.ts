import { AddBook } from '../../domain/usecases'
import { Book } from '../../domain/entities'
import { AddBookRepository } from '../protocols/db'
import { UuidGenerator } from '../protocols/uuid'
import { MissingParamError } from '../errors'
import { InvalidParamError } from '../errors'

export class AddBookService implements AddBook {
  constructor (
    private addBookRepository: AddBookRepository,
    private uuidGenerator: UuidGenerator
  ) {}

  async exec ({ title, publisher, photo, authors, description, price }: Book) {
    this.checkIfParamsExists({ title, publisher, photo, authors, description, price })

    this.checkParamsType({ title, publisher, photo, authors, description, price })

    const id: string = this.uuidGenerator.generate();

    const addedBook = await this.addBookRepository.add({ id, title, publisher, photo, authors, description, price })

    if (!addedBook) {
      throw new Error("Error to save in database")
    }

    return addedBook
  }

  private checkIfParamsExists({ 
    title, publisher, photo, authors, description, price
  }: Book): void {
    if (!title) throw new MissingParamError('title')
    if (!publisher) throw new MissingParamError('publisher')
    if (!photo) throw new MissingParamError('photo')
    if (!authors) throw new MissingParamError('authors')
    if (!description) throw new MissingParamError('description')
    if (!price) throw new MissingParamError('price')
  }

  private checkParamsType({ 
    title, publisher, photo, authors, description, price
  }: Book): void {
    if (typeof title !== 'string') throw new InvalidParamError('title')
    if (typeof publisher !== 'string') throw new InvalidParamError('publisher') 
    if (typeof photo !== 'string') throw new InvalidParamError('photo')
    if (typeof description !== 'string') throw new InvalidParamError('description')
    if (typeof price !== 'number') throw new InvalidParamError('price')

    const isAuthorsStringArray = Array.isArray(authors) 
      && authors.every(author => typeof author === 'string')
    
    if (!isAuthorsStringArray) {
      throw new InvalidParamError('authors')
    }
  }
}
