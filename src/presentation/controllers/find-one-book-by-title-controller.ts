import { FindOneBookByTitleRepositoryInterface } from "../../application/ports/find-book-repository";
import { InvalidParamError } from "../errors/invalid-param-error";
import { MissingParamError } from "../errors/missing-param-error";
import { badRequest, ok, serverError } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http-interfaces";

export class FindOneBookByTitleController implements Controller {
  constructor (private readonly findOneBookByTitleRepository: FindOneBookByTitleRepositoryInterface) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredParams = ['title']
      for (const param of requiredParams) {
        if (!httpRequest.body[param]) {
          return badRequest(new MissingParamError(param))
        }
      }
  
      const { title } = httpRequest.body
      if (typeof title !== 'string') {
        return badRequest(new InvalidParamError('title'))
      }
  
      const book = await this.findOneBookByTitleRepository.findOneByTitle(title)
      return ok(book)
    } catch (error: any) {
      return serverError(error)
    }
  }
}