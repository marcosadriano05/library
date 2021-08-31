import { Book } from '../entities/book'

export interface AddBook {
  exec: (book: Book) => Promise<Book>
}

export interface DeleteBook {
  exec: (id: string) => Promise<void>
}

export interface EditBook {
  exec: (id: string, book: Book) => Promise<Book>
}

export interface FetchAllBooks {
  exec: () => Promise<Book[]>
}

export interface FetchBook {
  exec: (id: string) => Promise<Book>
}