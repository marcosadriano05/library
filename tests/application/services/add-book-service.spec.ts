import { AddBookService } from '../../../src/application/services/add-book-service'
import { AddBookParams, Book } from '../../../src/domain/entities/book-entity'
import { AddBookRepositoryInterface } from '../../../src/application/ports/add-book-repository'
import { Author } from '../../../src/domain/entities/author-entity'
import { FindOneBookByTitleRepositoryInterface } from '../../../src/application/ports/find-book-repository'
import { BookAlredyExistsError } from '../../../src/application/errors/book-alredy-exists-error'

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

const fakeAddBookServiceParams = (): AddBookParams => ({
  title: 'any_title',
  description: 'any_description',
  price: 100,
  publisher: 'any_publisher',
  photo: 'any_photo',
  authors: ['any_author1', 'any_author2']
})

const makeAddBookRepository = (): AddBookRepositoryInterface => {
  class AddBookRepositoryStub implements AddBookRepositoryInterface {
    async add (addBookParams: AddBookParams): Promise<Book> {
      return new Promise(resolve => resolve(fakeBook()))
    }
  }
  return new AddBookRepositoryStub()
}

const makeFindOneBookRepository = (): FindOneBookByTitleRepositoryInterface => {
  class FindOneBookByTitleRepositoryStub implements FindOneBookByTitleRepositoryInterface {
    async findOneByTitle (title: string): Promise<Book | null> {
      return new Promise(resolve => resolve(fakeBook()))
    }
  }
  return new FindOneBookByTitleRepositoryStub()
}

interface SutTypes {
  sut: AddBookService
  addBookRepository: AddBookRepositoryInterface
  findOneBookByTitleRepository: FindOneBookByTitleRepositoryInterface
}

const makeSut = (): SutTypes => {
  const addBookRepository = makeAddBookRepository()
  const findOneBookByTitleRepository = makeFindOneBookRepository()
  const sut = new AddBookService(addBookRepository, findOneBookByTitleRepository)
  return {
    sut,
    addBookRepository,
    findOneBookByTitleRepository
  }
}

describe('Add Book Service - Integration with dependencies', () => {
  test('Should call AddBookRepository.add with correct params', async () => {
    const { sut, addBookRepository, findOneBookByTitleRepository } = makeSut()
    jest.spyOn(findOneBookByTitleRepository, 'findOneByTitle').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const addSpy = jest.spyOn(addBookRepository, 'add')
    await sut.add(fakeAddBookServiceParams())
    expect(addSpy).toHaveBeenLastCalledWith(fakeAddBookServiceParams())
  })

  test('Should throw if AddBookRepository.add throws', async () => {
    const { sut, addBookRepository, findOneBookByTitleRepository } = makeSut()
    jest.spyOn(findOneBookByTitleRepository, 'findOneByTitle').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    jest.spyOn(addBookRepository, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(fakeAddBookServiceParams())
    expect(promise).rejects.toThrow()
  })

  test('Should call FindOneBookByTitleRepository.findOneByTitle with correct params', async () => {
    const { sut, findOneBookByTitleRepository } = makeSut()
    const findOneByTitleSpy = jest.spyOn(findOneBookByTitleRepository, 'findOneByTitle')
    jest.spyOn(findOneBookByTitleRepository, 'findOneByTitle').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    await sut.add(fakeAddBookServiceParams())
    expect(findOneByTitleSpy).toHaveBeenCalledWith(fakeAddBookServiceParams().title)
  })

  test('Should throw if FindOneBookByTitleRepository.findOneByTitle throws', async () => {
    const { sut, findOneBookByTitleRepository } = makeSut()
    jest.spyOn(findOneBookByTitleRepository, 'findOneByTitle').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.add(fakeAddBookServiceParams())
    expect(promise).rejects.toThrow()
  })

  test('Should do not call AddBookRepository.add if FindOneBookByTitleRepository.findOneByTitle return a book', async () => {
    const { sut, addBookRepository, findOneBookByTitleRepository } = makeSut()
    jest.spyOn(findOneBookByTitleRepository, 'findOneByTitle').mockReturnValueOnce(new Promise(resolve => resolve(fakeBook())))
    const addSpy = jest.spyOn(addBookRepository, 'add')
    const promise = sut.add(fakeAddBookServiceParams())
    expect(addSpy).not.toHaveBeenCalled()
    expect(promise).rejects.toThrow()
  })

  test('Should throw a BookAlredyExistsError if FindOneBookByTitleRepository.findOneByTitle return a book', async () => {
    const { sut, findOneBookByTitleRepository } = makeSut()
    jest.spyOn(findOneBookByTitleRepository, 'findOneByTitle').mockReturnValueOnce(new Promise(resolve => resolve(fakeBook())))
    const promise = sut.add(fakeAddBookServiceParams())
    expect(promise).rejects.toThrow(new BookAlredyExistsError(fakeAddBookServiceParams().title))
  })
})

describe('Add Book Service - Success case', () => {
  test('Should return a book if AddBookRepository.add succeeds', async () => {
    const { sut, findOneBookByTitleRepository } = makeSut()
    jest.spyOn(findOneBookByTitleRepository, 'findOneByTitle').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const book = await sut.add(fakeAddBookServiceParams())
    expect(book).toEqual(fakeBook())
  })
})