import { FindOneBookByTitleServiceInterface } from "../../application/ports/find-book-service";
import { BookDto } from "../dtos/book-dto";
import { InvalidParamError } from "../errors/invalid-param-error";
import { MissingParamError } from "../errors/missing-param-error";
import { badRequest, ok, serverError } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http-interfaces";

export class FindOneBookByTitleController implements Controller {
  constructor (private readonly findOneBookByTitleService: FindOneBookByTitleServiceInterface) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredParams = ['title']
      for (const param of requiredParams) {
        if (!httpRequest.query[param]) {
          return badRequest(new MissingParamError(param))
        }
      }
  
      const { title } = httpRequest.query
      if (typeof title !== 'string') {
        return badRequest(new InvalidParamError('title'))
      }
  
      const bookEntity = await this.findOneBookByTitleService.findOneByTitle(title)
      const book = BookDto.build(bookEntity)
      return ok(book)
    } catch (error: any) {
      return serverError(error)
    }
  }
}