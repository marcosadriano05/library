import { Book } from "../../domain/entities/book-entity";

export class BookDto {
  static build (bookEntity: Book): Book {
    return {
      id: bookEntity.id,
      title: bookEntity.title,
      description: bookEntity.description,
      price: bookEntity.price,
      publisher: bookEntity.publisher,
      photo: bookEntity.photo,
      authors: bookEntity.authors.map(author => ({ id: author.id, name: author.name }))
    }
  }
}