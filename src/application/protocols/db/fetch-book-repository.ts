import { Book } from '../../../domain/entities'

export interface FetchBookRepository {
  fetch: (id: string) => Promise<Book>
}