import { Book } from '../../../domain/entities'

export interface AddBookRepository {
  add: (book: Book) => Promise<Book>
}