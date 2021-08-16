import { Book } from '../entities/book'

export interface FetchBook {
  exec: (id: string) => Promise<Book>
}