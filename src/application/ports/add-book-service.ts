import { Book, AddBookRequest } from '../../domain/entities/book-entity'

export interface AddBookServiceInterface {
	add: (addBookRquest: AddBookRequest) => Promise<Book>
}