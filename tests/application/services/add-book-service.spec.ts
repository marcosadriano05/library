import { AddBookService } from '../../../src/application/services/add-book-service'
import { AddBookParams, Book } from '../../../src/domain/entities/book-entity'
import { AddBookRepositoryInterface } from '../../../src/application/ports/add-book-repository'

const fakeBook = (): Book => ({
  id: 'any_id',
  title: 'any_title',
  description: 'any_description',
  price: 100,
  publisher: 'any_publisher',
  photo: 'any_photo',
  authors: ['any_author1', 'any_author2']
})

const fakeAddBookServiceParams = (): AddBookParams => ({
  title: 'any_title',
  description: 'any_description',
  price: 100,
  publisher: 'any_publisher',
  photo: 'any_photo',
  authors: ['any_author1', 'any_author2']
})

const makeAddBookRepository = (): AddBookRepositoryInterface => {
  class AddBookRepository implements AddBookRepositoryInterface {
    async add (addBookParams: AddBookParams): Promise<Book> {
      return new Promise(resolve => resolve(fakeBook()))
    }
  }
  return new AddBookRepository()
}

interface SutTypes {
  sut: AddBookService
  addBookRepository: AddBookRepositoryInterface
}

const makeSut = (): SutTypes => {
  const addBookRepository = makeAddBookRepository()
  const sut = new AddBookService(addBookRepository)
  return {
    sut,
    addBookRepository
  }
}

describe('Add Book Service - Integration with dependencies', () => {
  test('Should call AddBookRepository.add with correct params', async () => {
    const { sut, addBookRepository } = makeSut()
    const addSpy = jest.spyOn(addBookRepository, 'add')
    await sut.add(fakeAddBookServiceParams())
    expect(addSpy).toHaveBeenLastCalledWith(fakeAddBookServiceParams())
  })

  test('Should throw if AddBookRepository.add throws', async () => {
    const { sut, addBookRepository } = makeSut()
    jest.spyOn(addBookRepository, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(fakeAddBookServiceParams())
    expect(promise).rejects.toThrow()
  })
})

describe('Add Book Service - Success case', () => {
  test('Should return a book if AddBookRepository.add succeeds', async () => {
    const { sut, addBookRepository } = makeSut()
    const book = await sut.add(fakeAddBookServiceParams())
    expect(book).toEqual(fakeBook())
  })
})