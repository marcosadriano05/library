import { Router } from 'express'
import { ObraController } from './controllers/ObraController'

const route = Router()

const obraController = new ObraController()

route.post('/obras', obraController.add)
route.get('/obras', obraController.fetchAll)

export { route }
