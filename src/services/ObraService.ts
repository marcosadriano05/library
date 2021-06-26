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

  async fetchAll () {
    const obraRepository = getCustomRepository(ObraRepository)

    const obra = await obraRepository.find()

    return obra
  }
}

export { ObraService }