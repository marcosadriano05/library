import { Book } from '../entities/book'

export interface EditBook {
  exec: (id: string, book: Book) => Promise<Book>
}