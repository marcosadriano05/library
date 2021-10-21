import { Router } from "express";
import { expressAdapter } from "../adapters/express-route-adapter";
import { makeAddBookController } from "../factories/add-book-controller-factory";

export default (router: Router): void => {
  router.post('/addbook', expressAdapter(makeAddBookController()))
}