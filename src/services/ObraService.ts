import { getCustomRepository } from 'typeorm'
import { ObraRepository } from '../repositories/ObraRepository'

interface IObraRequest {
  title: string
  publisher: string
  photo: string
  authors: Array<string>
}

class ObraService {
  private obraRepository = getCustomRepository(ObraRepository)

  async create ({ title, publisher, photo, authors }: IObraRequest) {
    if (!title || !publisher || !photo || !authors) {
      throw new Error("Missing params")
    }

    const isParamsStrings = typeof title === 'string' 
      && typeof publisher === 'string' 
      && typeof photo === 'string'

    if (!isParamsStrings) {
      throw new Error("Params must be type string")
    }

    const isAuthorsStringArray = Array.isArray(authors) 
      && authors.every(author => typeof author === 'string')
    
    if (!isAuthorsStringArray) {
      throw new Error("Params must be type string")
    }

    const obra = this.obraRepository.create({ title, publisher, photo, authors })

    await this.obraRepository.save(obra)

    const addedObra = await this.obraRepository.findOne({ title })

    if (!addedObra) {
      throw new Error("Error to save in database")
    }

    return obra
  }

  async fetchAll () {
    const obra = await this.obraRepository.find()

    return obra
  }

  async edit (id: string, { title, publisher, photo, authors }: IObraRequest) {
    let partialEntity = {}

    if (title) partialEntity = { ...partialEntity, title }
    if (publisher) partialEntity = { ...partialEntity, publisher }
    if (photo) partialEntity = { ...partialEntity, photo }
    if (authors) partialEntity = { ...partialEntity, authors }

    await this.obraRepository.update(id, partialEntity)
    
    const obra = await this.obraRepository.findOne(id)

    return obra
  }

  async delete (id: string) {
    const deleteResult = await this.obraRepository.delete(id)

    return deleteResult
  }
}

export { ObraService }