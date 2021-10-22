import { AddBookRepositoryInterface } from "../../../application/ports/add-book-repository";
import { Author } from "../../../domain/entities/author-entity";
import { AddBookParams, Book } from "../../../domain/entities/book-entity";

export class DbAddBookRepository implements AddBookRepositoryInterface {
  async add (addBookParams: AddBookParams): Promise<Book> {

    const fakeAuthors: Author[] = addBookParams.authors.map(author => ({
      id: '123',
      name: author
    }))

    const fakeBook: Book = {
      id: '12345',
      title: addBookParams.title,
      description: addBookParams.description,
      price: addBookParams.price,
      publisher: addBookParams.publisher,
      photo: addBookParams.photo,
      authors: fakeAuthors
    }
    return new Promise(resolve => resolve(fakeBook))
  }
}