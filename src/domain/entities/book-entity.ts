import { Author } from "./author-entity";

export interface Book {
	id: string
	title: string
  description: string
  price: number
  publisher: string
  photo: string
  authors: Array<Author>
}

export interface AddBookParams {
  title: string
  description: string
  price: number
  publisher: string
  photo: string
  authors: Array<string>
}