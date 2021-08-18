import { AddBookService } from '../../../src/application/usecases'
import { AddBookRepository } from '../../../src/application/protocols/db'
import { UuidGenerator } from '../../../src/application/protocols/uuid'
import { Book } from '../../../src/domain/entities'
import { MissingParamError } from '../../../src/application/errors'

const makeAddBookRepositoryDbAdapter = () => {
  class AddBookRepositoryAdapter implements AddBookRepository {
    async add(book: Book) {
      return { id: '', title: '', publisher: '', photo: '', authors: [], description: '', price: 0 }
    }
  }

  return new AddBookRepositoryAdapter()
}

const makeUuidAdapter = () => {
  class UuidAdapter implements UuidGenerator {
    generate() {
      return ''
    }
  }

  return new UuidAdapter()
}

const makeSut = () => {
  const addBookRepositoryAdapter = makeAddBookRepositoryDbAdapter()
  const uuidAdapter = makeUuidAdapter()
  const addBookService = new AddBookService(addBookRepositoryAdapter, uuidAdapter)
  return addBookService
}

describe('AddBookService', () => {
  test('Should throw MissingParamError if no title is provided', async () => {
    const addBookService = makeSut()
    await expect(addBookService.exec({ 
      title: '', publisher: 'any_text', photo: 'any_text', authors: ['any_text'], description: 'any_text', price: 10 
    })).rejects.toThrow(new MissingParamError('title'))
  })
})