import { Book } from "../../domain/entities/book-entity";
import { BookNotExistsError } from "../errors/book-not-exists-error";
import { FindOneBookByTitleRepositoryInterface } from "../ports/find-book-repository";
import { FindOneBookByTitleServiceInterface } from "../ports/find-book-service";

export class FindOneBookByTitleService implements FindOneBookByTitleServiceInterface {
  constructor (private readonly findOneBookByTitleRepository: FindOneBookByTitleRepositoryInterface) {}
  async findOneByTitle (title: string): Promise<Book> {
    const book = await this.findOneBookByTitleRepository.findOneByTitle(title)
    
    if (!book) {
      throw new BookNotExistsError(title)
    }

    return book
  }
}