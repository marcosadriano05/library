import { FindAllBooksService } from '../../../src/application/services/find-all-books-service'
import { FindAllBooksRepositoryInterface } from '../../../src/application/ports/find-all-books-repository'
import { Book } from '../../../src/domain/entities/book-entity'
import { Author } from '../../../src/domain/entities/author-entity'
import { NoBooksAvailableError } from '../../../src/application/errors/no-books-available-error'

const fakeAuthor = (): Author => ({
  id: 'any_id',
  name: 'any_author'
})

const fakeBook = (): Book => ({
  id: 'any_id',
  title: 'any_title',
  description: 'any_description',
  price: 100,
  publisher: 'any_publisher',
  photo: 'any_photo',
  authors: [fakeAuthor()]
})

const makeFindAllBooksRepository = (): FindAllBooksRepositoryInterface => {
  class FindAllBooksRepositoryStub implements FindAllBooksRepositoryInterface {
    async find (): Promise<Book[]> {
      return new Promise(resolve => resolve([fakeBook(), fakeBook()]))
    }
  }
  return new FindAllBooksRepositoryStub()
}

interface SutTypes {
  sut: FindAllBooksService
  findAllBooksRepository: FindAllBooksRepositoryInterface
}

const makeSut = (): SutTypes => {
  const findAllBooksRepository = makeFindAllBooksRepository()
  const sut = new FindAllBooksService(findAllBooksRepository)
  return {
    sut,
    findAllBooksRepository
  }
}

describe('Find All Books Service - Integration with dependencies', () => {
  test('Should call FindAllBookspositoryInterface.find', async () => {
    const { sut, findAllBooksRepository } = makeSut()
    const findSpy = jest.spyOn(findAllBooksRepository, 'find')
    await sut.find()
    expect(findSpy).toHaveBeenCalledTimes(1)
    expect(findSpy).toHaveBeenCalledWith()
  })

  test('Should throw if FindAllBookspositoryInterface.find throws', async () => {
    const { sut, findAllBooksRepository } = makeSut()
    jest.spyOn(findAllBooksRepository, 'find').mockImplementation(() => { throw new Error() })
    const promise = sut.find()
    expect(promise).rejects.toThrow()
  })

  test('Should throw a NoBooksAvailableError if FindAllBookspositoryInterface.find do not return books', async () => {
    const { sut, findAllBooksRepository } = makeSut()
    jest.spyOn(findAllBooksRepository, 'find').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const promise = sut.find()
    expect(promise).rejects.toThrow(new NoBooksAvailableError())
  })
})

describe('Find All Books Service - Success case', () => {
  test('Should return a book if FindAllBooksService.find succeeds', async () => {
    const { sut } = makeSut()
    const book = await sut.find()
    expect(book).toEqual([fakeBook(), fakeBook()])
  })
})