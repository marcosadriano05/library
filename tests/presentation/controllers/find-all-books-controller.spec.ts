import { FindAllBooksController } from '../../../src/presentation/controllers/find-all-books-controller'
import { FindAllBooksServiceInterface } from '../../../src/application/ports/find-all-books-service'
import { Book } from '../../../src/domain/entities/book-entity'
import { Author } from '../../../src/domain/entities/author-entity'
import { HttpRequest } from '../../../src/presentation/protocols/http-interfaces'
import { ok, serverError } from '../../../src/presentation/helpers/http-helper'

const fakeHttpRequest = (): HttpRequest => ({})

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

const makeFindAllBooksService = (): FindAllBooksServiceInterface => {
  class FindAllBooksServiceStub implements FindAllBooksServiceInterface {
    async find (): Promise<Book[]> {
      return new Promise(resolve => resolve([fakeBook(), fakeBook()]))
    }
  }
  return new FindAllBooksServiceStub()
}

interface SutTypes {
  sut: FindAllBooksController
  findAllBooksService: FindAllBooksServiceInterface
}

const makeSut = (): SutTypes => {
  const findAllBooksService = makeFindAllBooksService()
  const sut = new FindAllBooksController(findAllBooksService)
  return {
    sut,
    findAllBooksService
  }
}

describe('Find One Book By Title Controller - Integration with dependencies', () => {
  test('Should call FindAllBooksService.find', async () => {
		const { sut, findAllBooksService } = makeSut()
		const findSpy = jest.spyOn(findAllBooksService, 'find')
		await sut.handle(fakeHttpRequest())
		expect(findSpy).toHaveBeenCalledTimes(1)
		expect(findSpy).toHaveBeenCalledWith()
	})

  test('Should return status 500 if FindAllBooksService.find throws', async () => {
		const { sut, findAllBooksService } = makeSut()
		jest.spyOn(findAllBooksService, 'find').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
		const httpResponse = await sut.handle(fakeHttpRequest())
		expect(httpResponse).toEqual(serverError(new Error()))
	})
})

describe('Find One Book By Title Controller - Success case', () => {
	test('Should return status 200 if FindAllBooksService.find succeeds', async () => {
		const { sut, findAllBooksService } = makeSut()
		jest.spyOn(findAllBooksService, 'find')
		const httpResponse = await sut.handle(fakeHttpRequest())
		expect(httpResponse).toEqual(ok([fakeBook(), fakeBook()]))
	})
})