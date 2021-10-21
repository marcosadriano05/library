import { Express, Router } from 'express'
import addBookRoute from '../routes/add-book-route'

export default (app: Express) => {
  const router = Router()

  app.use('/api', router)

  addBookRoute(router)
}