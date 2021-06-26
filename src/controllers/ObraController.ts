import { Request, Response } from 'express'
import { ObraService } from '../services/ObraService'

class ObraController {
  async add (req: Request, res: Response) {

    const { title, publisher, photo, authors } = req.body

    const obraService = new ObraService()

    const obra = await obraService.create({ title, publisher, photo, authors })

    res.status(200).json(obra)
  }

  async fetchAll (req: Request, res: Response) {
    const obraService = new ObraService()

    const obra = await obraService.fetchAll()

    res.status(200).json(obra)
  }

  async edit (req: Request, res: Response) {
    const { id } = req.params
    const { title, publisher, photo, authors } = req.body

    const obraService = new ObraService()

    const newObra = await obraService.edit(id, { title, publisher, photo, authors })

    res.status(200).json(newObra)
  }
}

export { ObraController }
