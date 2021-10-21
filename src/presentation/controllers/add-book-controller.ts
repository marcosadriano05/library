import { HttpRequest, HttpResponse} from '../http/http-interfaces'
import { Controller } from '../protocols/controller'
import { AddBookParams } from '../../domain/entities/book-entity'
import { AddBookServiceInterface } from '../../application/ports/add-book-service'

export class AddBookController implements Controller {

  constructor (private readonly addBookService: AddBookServiceInterface) {}

	async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredParams = ['title', 'description', 'price', 'publisher', 'photo', 'authors']
      for (const param of requiredParams) {
        if (!httpRequest.body[param]) {
          return { statusCode: 400, body: `Missing param ${param}` }
        }
      }
  
      const { title, description, price, publisher, photo, authors }: AddBookParams = httpRequest.body
      if (typeof title !== 'string') {
        return { statusCode: 400, body: 'Invalid param title' }
      }
      if (typeof description !== 'string') {
        return { statusCode: 400, body: 'Invalid param description' }
      }
      if (typeof price !== 'number') {
        return { statusCode: 400, body: 'Invalid param price' }
      }
      if (typeof publisher !== 'string') {
        return { statusCode: 400, body: 'Invalid param publisher' }
      }
      if (typeof photo !== 'string') {
        return { statusCode: 400, body: 'Invalid param photo' }
      }
      if (!(authors instanceof Array) || authors.length === 0) {
        return { statusCode: 400, body: 'Invalid param authors' }
      }
      if (authors.some(author => typeof author !== 'string' || !author)) {
        return { statusCode: 400, body: 'Invalid param authors' }
      }
  
      const book = await this.addBookService.add(httpRequest.body)
      return { statusCode: 201, body: book}
    } catch (error) {
      return { statusCode: 500, body: 'Server error' }
    }
	}
}