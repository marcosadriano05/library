import { FindOneBookByTitleService } from '../../../src/application/services/find-one-book-by-title-service'
import { FindOneBookByTitleRepositoryInterface } from '../../../src/application/ports/find-book-repository'
import { Book } from '../../../src/domain/entities/book-entity'
import { Author } from '../../../src/domain/entities/author-entity'
import { BookNotExistsError } from '../../../src/application/errors/book-not-exists-error'

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

const makeFindOneBookByTitleRepository = (): FindOneBookByTitleRepositoryInterface => {
  class FindOneBookByTitleRepositoryStub implements FindOneBookByTitleRepositoryInterface {
    async findOneByTitle (title: string): Promise<Book | null> {
      return new Promise(resolve => resolve(fakeBook()))
    }
  }
  return new FindOneBookByTitleRepositoryStub()
}

interface SutTypes {
  sut: FindOneBookByTitleService
  findOneBookByTitleRepository: FindOneBookByTitleRepositoryInterface
}

const makeSut = (): SutTypes => {
  const findOneBookByTitleRepository = makeFindOneBookByTitleRepository()
  const sut = new FindOneBookByTitleService(findOneBookByTitleRepository)
  return {
    sut,
    findOneBookByTitleRepository
  }
}

describe('Find One Book Service - Integration with dependencies', () => {
  test('Should call FindOneBookByTitleRepositoryInterface.findOneByTitle with correct params', async () => {
    const { sut, findOneBookByTitleRepository } = makeSut()
    const findOneByTitleSpy = jest.spyOn(findOneBookByTitleRepository, 'findOneByTitle')
    await sut.findOneByTitle('any_title')
    expect(findOneByTitleSpy).toHaveBeenCalledWith('any_title')
  })

  test('Should throw if FindOneBookByTitleRepositoryInterface.findOneByTitle throws', async () => {
    const { sut, findOneBookByTitleRepository } = makeSut()
    jest.spyOn(findOneBookByTitleRepository, 'findOneByTitle').mockImplementation(() => { throw new Error() })
    const promise = sut.findOneByTitle('any_title')
    expect(promise).rejects.toThrow()
  })

  test('Should throw a BookNotExistsError if FindOneBookByTitleRepositoryInterface.findOneByTitle do not return an book', async () => {
    const { sut, findOneBookByTitleRepository } = makeSut()
    jest.spyOn(findOneBookByTitleRepository, 'findOneByTitle').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const promise = sut.findOneByTitle('any_title')
    expect(promise).rejects.toThrow(new BookNotExistsError('any_title'))
  })
})

describe('Find One Book Service - Success case', () => {
  test('Should return a book if FindOneBookByTitleService.findOneByTitle succeeds', async () => {
    const { sut } = makeSut()
    const book = await sut.findOneByTitle('any_title')
    expect(book).toEqual(fakeBook())
  })
})