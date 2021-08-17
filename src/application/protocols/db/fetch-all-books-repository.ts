import { Book } from '../../../domain/entities'

export interface FetchAllBooksRepository {
  fetch: () => Promise<Book[]>
}