import { AddBookParams, Book } from "../../domain/entities/book-entity";
import { AddBookRepositoryInterface } from "../ports/add-book-repository";
import { AddBookServiceInterface } from "../ports/add-book-service";

export class AddBookService implements AddBookServiceInterface {

  constructor (private readonly addBookRepository: AddBookRepositoryInterface) {}

  async add (addBookParams: AddBookParams): Promise<Book> {
    const book = await this.addBookRepository.add(addBookParams)
    return book
  }
}