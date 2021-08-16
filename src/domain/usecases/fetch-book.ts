import { Book } from '../entities/book'

export interface FetchAllBook {
  exec: (id: string) => Promise<Book>
}