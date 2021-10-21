import { AddBookService } from "../../application/services/add-book-service";
import { DbAddBookRepository } from "../../infra/database/teste/db-add-book-repository";
import { AddBookController } from "../../presentation/controllers/add-book-controller";
import { Controller } from "../../presentation/protocols/controller";

export const makeAddBookController = (): Controller => {
  const dbAddBookRepository = new DbAddBookRepository()
  const addBookService = new AddBookService(dbAddBookRepository)
  return new AddBookController(addBookService)
}