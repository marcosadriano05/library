import { Book } from '../entities/book'

export interface AddBook {
  exec: (book: Book) => Promise<Book>
}