import { AddBookParams, Book } from "../../domain/entities/book-entity";

export interface AddBookRepositoryInterface {
  add: (addBookParams: AddBookParams) => Promise<Book>
}