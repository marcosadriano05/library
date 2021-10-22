import { AddBookController } from '../../../src/presentation/controllers/add-book-controller'
import { HttpRequest, HttpResponse } from '../../../src/presentation/protocols/http-interfaces'
import { Book, AddBookParams } from '../../../src/domain/entities/book-entity'
import { AddBookServiceInterface } from '../../../src/application/ports/add-book-service'
import { MissingParamError } from '../../../src/presentation/errors/missing-param-error'
import { InvalidParamError } from '../../../src/presentation/errors/invalid-param-error'
import { badRequest, serverError } from '../../../src/presentation/helpers/http-helper'
import { Author } from '../../../src/domain/entities/author-entity'

const fakeHttpRequest = (): HttpRequest => ({
	body: {
		title: 'any_title',
		description: 'any_description',
		price: 100,
		publisher: 'any_publisher',
		photo: 'any_photo',
		authors: ['any_author1', 'any_author2']
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

const makeAddBookService = (): any => {
	class AddBookServiceStub implements AddBookServiceInterface {
		async add (addBookParams: AddBookParams): Promise<Book> {
			return new Promise(resolve => resolve(fakeBook()))
		}
	}
	return new AddBookServiceStub()
}

interface SutTypes {
	sut: AddBookController
	addBookService: AddBookServiceInterface
}

const makeSut = (): SutTypes => {
	const addBookService = makeAddBookService()
	const sut = new AddBookController(addBookService)
	return {
		sut,
		addBookService
	}
}

describe('Add Book Controller - Missing and falsy params provided', () => {
	test('Should return status 400 if no title is provided', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		delete httpRequest.body.title
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse).toEqual(badRequest(new MissingParamError('title')))
	})

	test('Should return status 400 if no description is provided', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		delete httpRequest.body.description
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse).toEqual(badRequest(new MissingParamError('description')))
	})

	test('Should return status 400 if no price is provided', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		delete httpRequest.body.price
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse).toEqual(badRequest(new MissingParamError('price')))
	})

	test('Should return status 400 if no publisher is provided', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		delete httpRequest.body.publisher
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse).toEqual(badRequest(new MissingParamError('publisher')))
	})

	test('Should return status 400 if no photo is provided', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		delete httpRequest.body.photo
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse).toEqual(badRequest(new MissingParamError('photo')))
	})

	test('Should return status 400 if no authors is provided', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		delete httpRequest.body.authors
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse).toEqual(badRequest(new MissingParamError('authors')))
	})
})

describe('Add Book Controller - Params with incorrect types', () => {
	test('Should return status 400 if title type is not string', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		httpRequest.body.title = 1
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse).toEqual(badRequest(new InvalidParamError('title')))
	})

	test('Should return status 400 if description type is not string', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		httpRequest.body.description = 1
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse).toEqual(badRequest(new InvalidParamError('description')))
	})

	test('Should return status 400 if price type is not number', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		httpRequest.body.price = '1'
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse).toEqual(badRequest(new InvalidParamError('price')))
	})

	test('Should return status 400 if publisher type is not string', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		httpRequest.body.publisher = 1
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse).toEqual(badRequest(new InvalidParamError('publisher')))
	})

	test('Should return status 400 if photo type is not string', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		httpRequest.body.photo = 1
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse).toEqual(badRequest(new InvalidParamError('photo')))
	})

	test('Should return status 400 if authors type is not an array of strings', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		let httpResponse: HttpResponse
		httpRequest.body.authors = 1
		httpResponse = await sut.handle(httpRequest)
		expect(httpResponse).toEqual(badRequest(new InvalidParamError('authors')))
		httpRequest.body.authors = [1, 2, 'any_author']
		httpResponse = await sut.handle(httpRequest)
		expect(httpResponse).toEqual(badRequest(new InvalidParamError('authors')))
		httpRequest.body.authors = ['any_author', '', '']
		httpResponse = await sut.handle(httpRequest)
		expect(httpResponse).toEqual(badRequest(new InvalidParamError('authors')))
		httpRequest.body.authors = []
		httpResponse = await sut.handle(httpRequest)
		expect(httpResponse).toEqual(badRequest(new InvalidParamError('authors')))
	})
})

describe('Add Book Controller - Integration with dependencies', () => {
	test('Should call AddBookService.add with correct params', async () => {
		const { sut, addBookService } = makeSut()
		const addSpy = jest.spyOn(addBookService, 'add')
		await sut.handle(fakeHttpRequest())
		expect(addSpy).toHaveBeenCalledWith(fakeHttpRequest().body)
	})

	test('Should return status 500 if AddBookService.add throws', async () => {
		const { sut, addBookService } = makeSut()
		jest.spyOn(addBookService, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
		const httpResponse = await sut.handle(fakeHttpRequest())
		expect(httpResponse).toEqual(serverError(new Error()))
	})
})

describe('Add Book Controller - Success case', () => {
	test('Should return status 201 if AddBookService.add succeeds', async () => {
		const { sut, addBookService } = makeSut()
		jest.spyOn(addBookService, 'add')
		const httpResponse = await sut.handle(fakeHttpRequest())
		expect(httpResponse.statusCode).toBe(201)
		expect(httpResponse.body).toEqual(fakeBook())
	})
})