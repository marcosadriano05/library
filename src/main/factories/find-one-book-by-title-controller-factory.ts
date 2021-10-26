import { FindOneBookByTitleService } from "../../application/services/find-one-book-by-title-service";
import { DbFindBookPostgresRepository } from "../../infra/database/postgresql/find-book-postgres-repository";
import { FindOneBookByTitleController } from "../../presentation/controllers/find-one-book-by-title-controller";
import { Controller } from "../../presentation/protocols/controller";

export const makeFindOneBookByTitleController = (): Controller => {
  const dbFindBookPostgresRepository = new DbFindBookPostgresRepository()
  const findOneBookByTitleService = new FindOneBookByTitleService(dbFindBookPostgresRepository)
  return new FindOneBookByTitleController(findOneBookByTitleService)
}