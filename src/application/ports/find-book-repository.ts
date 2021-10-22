import { Book } from "../../domain/entities/book-entity";

export interface FindOneBookByTitleRepositoryInterface {
  findOneByTitle: (title: string) => Promise<Book | null>
}