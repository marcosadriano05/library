import { Author } from "../../domain/entities/author-entity";
import { Book } from "../../domain/entities/book-entity";
import { NoBooksAvailableError } from "../errors/no-books-available-error";
import { FindAllBooksRepositoryInterface } from "../ports/find-all-books-repository";
import { FindAllBooksServiceInterface } from "../ports/find-all-books-service";

export class FindAllBooksService implements FindAllBooksServiceInterface {

  constructor (private readonly findAllBooksRepository: FindAllBooksRepositoryInterface) {}

  async find (): Promise<Book[]> {
    const books = await this.findAllBooksRepository.find()
    if (!books) {
      throw new NoBooksAvailableError()
    }

    return books
  }
}