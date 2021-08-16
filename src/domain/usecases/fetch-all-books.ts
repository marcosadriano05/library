import { Book } from '../entities/book'

export interface FetchAllBook {
  exec: () => Promise<Book[]>
}