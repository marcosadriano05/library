import { Router } from 'express'
import { ObraController } from './controllers/ObraController'

const route = Router()

const obraController = new ObraController()

route.post('/obras', obraController.handle)

export { route }
