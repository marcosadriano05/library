import { Book } from '../entities/book'

export interface FetchAllBooks {
  exec: () => Promise<Book[]>
}