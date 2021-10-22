export class BookAlredyExistsError extends Error {
  constructor (title: string) {
    super(`Book alredy exists: ${title}`)
    this.name = 'BookAlredyExistsError'
  }
}