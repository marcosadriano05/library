import { AddBookParams, Book } from "../../domain/entities/book-entity";
import { BookAlredyExistsError } from "../errors/book-alredy-exists-error";
import { AddBookRepositoryInterface } from "../ports/add-book-repository";
import { AddBookServiceInterface } from "../ports/add-book-service";
import { FindOneBookByTitleRepositoryInterface } from "../ports/find-book-repository";

export class AddBookService implements AddBookServiceInterface {

  constructor (
    private readonly addBookRepository: AddBookRepositoryInterface,
    private readonly findOneBookByTitleRepository: FindOneBookByTitleRepositoryInterface
  ) {}

  async add (addBookParams: AddBookParams): Promise<Book> {
    const existentBook = await this.findOneBookByTitleRepository.findOneByTitle(addBookParams.title)
    if (existentBook) {
      throw new BookAlredyExistsError(addBookParams.title)
    }
    const book = await this.addBookRepository.add(addBookParams)
    return book
  }
}