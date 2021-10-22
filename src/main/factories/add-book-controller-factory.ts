import { AddBookService } from "../../application/services/add-book-service";
import { DbAddBookPostgresRepository } from "../../infra/database/postgresql/add-book-postgres-repository";
import { DbFindBookPostgresRepository } from "../../infra/database/postgresql/find-book-postgres-repository";
// import { DbAddBookRepository } from "../../infra/database/teste/db-add-book-repository";
import { AddBookController } from "../../presentation/controllers/add-book-controller";
import { Controller } from "../../presentation/protocols/controller";

export const makeAddBookController = (): Controller => {
  // const dbAddBookRepository = new DbAddBookRepository()
  const dbAddBookPostgresRepository = new DbAddBookPostgresRepository()
  const dbFindBookPostgresRepository = new DbFindBookPostgresRepository()
  const addBookService = new AddBookService(dbAddBookPostgresRepository, dbFindBookPostgresRepository)
  return new AddBookController(addBookService)
}