import { AddBookController } from '../../src/presentation/controllers/add-book-controller'
import { HttpRequest, HttpResponse } from '../../src/presentation/http/http-interfaces'
import { Controller } from '../../src/presentation/protocols/controller'

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

interface SutTypes {
	sut: Controller
}

const makeSut = (): SutTypes => {
	const sut = new AddBookController()
	return {
		sut
	}
}

describe('Add Book Controller - Missing and falsy params provided', () => {
	test('Should return status 400 if no title is provided', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		delete httpRequest.body.title
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toBe('Missing param title')
	})

	test('Should return status 400 if no description is provided', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		delete httpRequest.body.description
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toBe('Missing param description')
	})

	test('Should return status 400 if no price is provided', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		delete httpRequest.body.price
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toBe('Missing param price')
	})

	test('Should return status 400 if no publisher is provided', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		delete httpRequest.body.publisher
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toBe('Missing param publisher')
	})

	test('Should return status 400 if no photo is provided', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		delete httpRequest.body.photo
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toBe('Missing param photo')
	})

	test('Should return status 400 if no authors is provided', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		delete httpRequest.body.authors
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toBe('Missing param authors')
	})
})

describe('Add Book Controller - Params with incorrect types', () => {
	test('Should return status 400 if title type is not string', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		httpRequest.body.title = 1
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toBe('Invalid param title')
	})

	test('Should return status 400 if description type is not string', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		httpRequest.body.description = 1
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toBe('Invalid param description')
	})

	test('Should return status 400 if price type is not number', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		httpRequest.body.price = '1'
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toBe('Invalid param price')
	})

	test('Should return status 400 if publisher type is not string', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		httpRequest.body.publisher = 1
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toBe('Invalid param publisher')
	})

	test('Should return status 400 if photo type is not string', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		httpRequest.body.photo = 1
		const httpResponse = await sut.handle(httpRequest)
		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toBe('Invalid param photo')
	})

	test('Should return status 400 if authors type is not an array of strings', async () => {
		const { sut } = makeSut()
		const httpRequest: HttpRequest = fakeHttpRequest()
		let httpResponse: HttpResponse
		httpRequest.body.authors = 1
		httpResponse = await sut.handle(httpRequest)
		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toBe('Invalid param authors')
		httpRequest.body.authors = [1, 2, 'any_author']
		httpResponse = await sut.handle(httpRequest)
		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toBe('Invalid param authors')
		httpRequest.body.authors = ['any_author', '', '']
		httpResponse = await sut.handle(httpRequest)
		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toBe('Invalid param authors')
		httpRequest.body.authors = []
		httpResponse = await sut.handle(httpRequest)
		expect(httpResponse.statusCode).toBe(400)
		expect(httpResponse.body).toBe('Invalid param authors')
	})
})