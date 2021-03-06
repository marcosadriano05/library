import { Request, Response } from 'express'
import { ObraService } from '../services/ObraService'

class ObraController {
  async add (req: Request, res: Response) {
    try {
      const { title, publisher, photo, authors } = req.body
  
      const obraService = new ObraService()
  
      const obra = await obraService.create({ title, publisher, photo, authors })
  
      res.status(200).json(obra)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async fetchAll (req: Request, res: Response) {
    try {
      const obraService = new ObraService()
  
      const obra = await obraService.fetchAll()
  
      res.status(200).json(obra)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async fetchOne (req: Request, res: Response) {
    try {
      const obraService = new ObraService()
  
      const { id } = req.params
      const obra = await obraService.fetchOne(id)
  
      res.status(200).json(obra)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async edit (req: Request, res: Response) {
    try {
      const { id } = req.params
      const { title, publisher, photo, authors } = req.body
  
      const obraService = new ObraService()
  
      const newObra = await obraService.edit(id, { title, publisher, photo, authors })
  
      res.status(200).json(newObra)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async delete (req: Request, res: Response) {
    try {
      const { id } = req.params
  
      const obraService = new ObraService()
  
      const result = await obraService.delete(id)
  
      res.status(200).json(result)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}

export { ObraController }
