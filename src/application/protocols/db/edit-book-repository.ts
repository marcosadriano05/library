import { Book } from '../../../domain/entities'

export interface EditBookRepository {
  edit: (id: string, book: Book) => Promise<Book>
}