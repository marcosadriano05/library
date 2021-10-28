import { Router } from "express";
import { expressAdapter } from "../adapters/express-route-adapter";
import { makeAddBookController } from "../factories/add-book-controller-factory";
import { makeFindOneBookByTitleController } from "../factories/find-one-book-by-title-controller-factory";

export default (router: Router): void => {
  router.post('/book', expressAdapter(makeAddBookController()))
  router.get('/book', expressAdapter(makeFindOneBookByTitleController()))
}