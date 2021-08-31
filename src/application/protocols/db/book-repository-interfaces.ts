import { Book } from '../../../domain/entities'

export interface AddBookRepository {
  add: (book: Book) => Promise<Book>
}

export interface DeleteBookRepository {
  delete: (id: string) => Promise<void>
}

export interface EditBookRepository {
  edit: (book: Book) => Promise<Book | void>
}

export interface FetchAllBooksRepository {
  fetch: () => Promise<Book[]>
}

export interface FetchBookRepository {
  fetch: (id: string) => Promise<Book>
}