import { Express, Router } from 'express'
import addBookRoute from '../routes/book-routes'

export default (app: Express) => {
  const router = Router()

  app.use('/api', router)

  addBookRoute(router)
}