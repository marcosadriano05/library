import { getCustomRepository } from 'typeorm'
import { ObraRepository } from '../repositories/ObraRepository'

interface IObraRequest {
  title: string
  publisher: string
  photo: string
  authors: Array<string>
}

class ObraService {
  async create ({ title, publisher, photo, authors }: IObraRequest) {
    const obraRepository = getCustomRepository(ObraRepository)

    const obra = obraRepository.create({ title, publisher, photo, authors })

    await obraRepository.save(obra)

    return obra
  }
}

export { ObraService }