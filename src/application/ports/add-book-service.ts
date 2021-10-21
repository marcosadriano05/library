import { Book, AddBookParams } from '../../domain/entities/book-entity'

export interface AddBookServiceInterface {
	add: (addBookParams: AddBookParams) => Promise<Book>
}