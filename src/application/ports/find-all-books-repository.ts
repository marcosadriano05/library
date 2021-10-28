import { Book } from "../../domain/entities/book-entity";

export interface FindAllBooksRepositoryInterface {
  find: () => Promise<Book[] | null>
}