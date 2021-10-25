import { Book } from "../../domain/entities/book-entity";

export interface FindOneBookByTitleServiceInterface {
  findOneByTitle: (title: string) => Promise<Book>
}