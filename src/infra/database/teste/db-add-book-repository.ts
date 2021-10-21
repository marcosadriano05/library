import { AddBookRepositoryInterface } from "../../../application/ports/add-book-repository";
import { AddBookParams, Book } from "../../../domain/entities/book-entity";

export class DbAddBookRepository implements AddBookRepositoryInterface {
  async add (addBookParams: AddBookParams): Promise<Book> {
    const fakeBook: Book = {
      id: '12345',
      title: addBookParams.title,
      description: addBookParams.description,
      price: addBookParams.price,
      publisher: addBookParams.publisher,
      photo: addBookParams.photo,
      authors: addBookParams.authors
    }
    return new Promise(resolve => resolve(fakeBook))
  }
}