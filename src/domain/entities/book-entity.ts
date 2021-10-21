export interface Book {
	id: string
	title: string
  description: string
  price: number
  publisher: string
  photo: string
  authors: Array<string>
}

export interface AddBookParams {
  title: string
  description: string
  price: number
  publisher: string
  photo: string
  authors: Array<string>
}