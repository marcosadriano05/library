import { Book } from '../entities/book'

export interface FetchAllBook {
  exec: (id: string, book: Book) => Promise<Book>
}