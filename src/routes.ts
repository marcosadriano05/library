import { Router } from 'express'
import { ObraController } from './controllers/ObraController'

const route = Router()

const obraController = new ObraController()

route.post('/obras', obraController.add)
route.get('/obras', obraController.fetchAll)
route.put('/obras/:id', obraController.edit)
route.delete('/obras/:id', obraController.delete)

export { route }
