import { HttpRequest, HttpResponse} from '../protocols/http-interfaces'
import { Controller } from '../protocols/controller'
import { AddBookParams } from '../../domain/entities/book-entity'
import { AddBookServiceInterface } from '../../application/ports/add-book-service'
import { badRequest, created, serverError } from '../helpers/http-helper'
import { MissingParamError } from '../errors/missing-param-error'
import { InvalidParamError } from '../errors/invalid-param-error'

export class AddBookController implements Controller {

  constructor (private readonly addBookService: AddBookServiceInterface) {}

	async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredParams = ['title', 'description', 'price', 'publisher', 'photo', 'authors']
      for (const param of requiredParams) {
        if (!httpRequest.body[param]) {
          return badRequest(new MissingParamError(param))
        }
      }
  
      const { title, description, price, publisher, photo, authors }: AddBookParams = httpRequest.body
      if (typeof title !== 'string') {
        return badRequest(new InvalidParamError('title'))
      }
      if (typeof description !== 'string') {
        return badRequest(new InvalidParamError('description'))
      }
      if (typeof price !== 'number') {
        return badRequest(new InvalidParamError('price'))
      }
      if (typeof publisher !== 'string') {
        return badRequest(new InvalidParamError('publisher'))
      }
      if (typeof photo !== 'string') {
        return badRequest(new InvalidParamError('photo'))
      }
      if (!(authors instanceof Array) || authors.length === 0) {
        return badRequest(new InvalidParamError('authors'))
      }
      if (authors.some(author => typeof author !== 'string' || !author)) {
        return badRequest(new InvalidParamError('authors'))
      }
  
      const book = await this.addBookService.add(httpRequest.body)
      return created(book)
    } catch (error: any) {
      return serverError(error)
    }
	}
}