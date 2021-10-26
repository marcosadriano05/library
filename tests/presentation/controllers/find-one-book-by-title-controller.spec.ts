import { FindOneBookByTitleController } from '../../../src/presentation/controllers/find-one-book-by-title-controller'
import { InvalidParamError } from '../../../src/presentation/errors/invalid-param-error'
import { MissingParamError } from '../../../src/presentation/errors/missing-param-error'
import { badRequest, ok, serverError } from '../../../src/presentation/helpers/http-helper'
import { HttpRequest } from '../../../src/presentation/protocols/http-interfaces'
import { FindOneBookByTitleServiceInterface } from '../../../src/application/ports/find-book-service'
import { Book } from '../../../src/domain/entities/book-entity'
import { Author } from '../../../src/domain/entities/author-entity'

const fakeHttpRequest = () => ({
	query: {
		title: 'any_title'
	}
})

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

const makeFindOneBookByTitleService = (): FindOneBookByTitleServiceInterface => {
  class FindOneBookByTitleServiceStub implements FindOneBookByTitleServiceInterface {
    async findOneByTitle (title: string): Promise<Book> {
      return new Promise(resolve => resolve(fakeBook()))
    }
  }
  return new FindOneBookByTitleServiceStub()
}

interface SutTypes {
  sut: FindOneBookByTitleController
  findOneBookByTitleService: FindOneBookByTitleServiceInterface
}

const makeSut = (): SutTypes => {
  const findOneBookByTitleService = makeFindOneBookByTitleService()
  const sut = new FindOneBookByTitleController(findOneBookByTitleService)
  return {
    sut,
    findOneBookByTitleService
  }
}

describe('Find One Book By Title Controller - Missing and falsy params provided', () => {
  test('Should return status 400 if no title is provided', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		delete httpRequest.query.title
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse).toEqual(badRequest(new MissingParamError('title')))
	})
})

describe('Find One Book By Title Controller - Params with incorrect types', () => {
  test('Should return status 400 if title type is not string', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		httpRequest.query.title = 1
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse).toEqual(badRequest(new InvalidParamError('title')))
	})
})

describe('Find One Book By Title Controller - Integration with dependencies', () => {
  test('Should call FindOneBookByTitleRepository.findOneByTitle with correct params', async () => {
		const { sut, findOneBookByTitleService } = makeSut()
		const addSpy = jest.spyOn(findOneBookByTitleService, 'findOneByTitle')
		await sut.handle(fakeHttpRequest())
		expect(addSpy).toHaveBeenCalledWith(fakeHttpRequest().query.title)
	})

  test('Should return status 500 if FindOneBookByTitleRepository.findOneByTitle throws', async () => {
		const { sut, findOneBookByTitleService } = makeSut()
		jest.spyOn(findOneBookByTitleService, 'findOneByTitle').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
		const httpResponse = await sut.handle(fakeHttpRequest())
		expect(httpResponse).toEqual(serverError(new Error()))
	})
})

describe('Add Book Controller - Success case', () => {
	test('Should return status 201 if AddBookService.add succeeds', async () => {
		const { sut, findOneBookByTitleService } = makeSut()
		jest.spyOn(findOneBookByTitleService, 'findOneByTitle')
		const httpResponse = await sut.handle(fakeHttpRequest())
		expect(httpResponse).toEqual(ok(fakeBook()))
	})
})