import { AddBookRepositoryInterface } from "../../../application/ports/add-book-repository";
import { AddBookParams, Book } from "../../../domain/entities/book-entity";
import { getCustomRepository } from 'typeorm'
import { BookEntityRepository } from './typeorm/repositories/book-repository-typeorm'

export class DbAddBookPostgresRepository implements AddBookRepositoryInterface {
  async add (addBookParams: AddBookParams): Promise<Book> {
    const bookRepository = getCustomRepository(BookEntityRepository)
    const authorsEntities = addBookParams.authors.map(author => ({ name: author }))

    const bookEntity = {
      title: addBookParams.title,
      description: addBookParams.description,
      price: addBookParams.price,
      publisher: addBookParams.publisher,
      photo: addBookParams.photo,
      authors: authorsEntities
    }

    const book = bookRepository.create(bookEntity)

    const savedBook = await bookRepository.save(book)

    return savedBook
  }
}