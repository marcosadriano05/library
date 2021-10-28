import { Book } from "../../domain/entities/book-entity";

export interface FindAllBooksServiceInterface {
  find: () => Promise<Book[]>
}