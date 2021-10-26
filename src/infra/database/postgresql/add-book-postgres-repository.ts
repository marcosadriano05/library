import { AddBookRepositoryInterface } from "../../../application/ports/add-book-repository";
import { AddBookParams, Book } from "../../../domain/entities/book-entity";
import { getCustomRepository } from 'typeorm'
import { BookEntityRepository } from './typeorm/repositories/book-repository-typeorm'
import { AuthorEntityRepository } from "./typeorm/repositories/author-repository-typeorm";

export class DbAddBookPostgresRepository implements AddBookRepositoryInterface {
  async add (addBookParams: AddBookParams): Promise<Book> {
    const bookRepository = getCustomRepository(BookEntityRepository)
    const authorRepository = getCustomRepository(AuthorEntityRepository)

    const authorsPromises = addBookParams.authors.map(async author => {
      const element = await authorRepository.findOne({ name: author })
      if (element) {
        return { id: element.id, name: element.name }
      }
      return { name: author }
    })

    const authors = await Promise.all(authorsPromises)

    const bookEntity = {
      title: addBookParams.title,
      description: addBookParams.description,
      price: addBookParams.price,
      publisher: addBookParams.publisher,
      photo: addBookParams.photo,
      authors: authors
    }

    const book = bookRepository.create(bookEntity)

    const savedBook = await bookRepository.save(book)

    return savedBook
  }
}