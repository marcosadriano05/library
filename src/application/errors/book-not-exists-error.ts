export class BookNotExistsError extends Error {
  constructor (title: string) {
    super(`Book not exists: ${title}`)
    this.name = 'BookNotExistsError'
  }
}