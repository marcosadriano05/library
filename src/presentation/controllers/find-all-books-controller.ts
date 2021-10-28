import { FindAllBooksServiceInterface } from "../../application/ports/find-all-books-service";
import { ok, serverError } from "../helpers/http-helper";
import { Controller } from "../protocols/controller";
import { HttpRequest, HttpResponse } from "../protocols/http-interfaces";

export class FindAllBooksController implements Controller {

  constructor (private readonly findAllBooksService: FindAllBooksServiceInterface) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const books = await this.findAllBooksService.find()
      return ok(books)
    } catch (error: any) {
      return serverError(error)
    }
  }
}