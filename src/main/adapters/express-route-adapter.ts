import { Controller } from "../../presentation/protocols/controller";
import { HttpRequest } from "../../presentation/http/http-interfaces";
import { Request, Response } from 'express'

export const expressAdapter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }

    const httpResponse = await controller.handle(httpRequest)

    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}