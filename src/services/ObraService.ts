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

  async edit (id: string, { title, publisher, photo, authors }: IObraRequest) {
    const obraRepository = getCustomRepository(ObraRepository)

    let partialEntity = {}

    if (title) partialEntity = { ...partialEntity, title }
    if (publisher) partialEntity = { ...partialEntity, publisher }
    if (photo) partialEntity = { ...partialEntity, photo }
    if (authors) partialEntity = { ...partialEntity, authors }

    await obraRepository.update(id, partialEntity)
    
    const obra = await obraRepository.findOne(id)

    return obra
  }
}

export { ObraService }