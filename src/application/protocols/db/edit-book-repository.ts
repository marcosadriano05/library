import { Book } from '../../../domain/entities'

export interface EditBookRepository {
  edit: (book: Book) => Promise<Book | void>
}