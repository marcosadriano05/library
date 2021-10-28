export class NoBooksAvailableError extends Error {
  constructor () {
    super('No books are available')
    this.name = 'NoBooksAvailableError'
  }
}