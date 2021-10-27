import { FindOneBookByTitleRepositoryInterface } from "../../../application/ports/find-book-repository";
import { Book } from "../../../domain/entities/book-entity";
import { getCustomRepository } from "typeorm";
import { BookEntityRepository } from "./typeorm/repositories/book-repository-typeorm";

export class DbFindBookPostgresRepository implements FindOneBookByTitleRepositoryInterface {
  async findOneByTitle (title: string): Promise<Book | null> {
    const bookRepository = getCustomRepository(BookEntityRepository)

    const existentBook = await bookRepository.findOne({
      relations: ['authors'],
      where: { title }
    })

    if (!existentBook) {
      return null
    }

    return existentBook
  }
}