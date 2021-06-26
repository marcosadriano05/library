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

    if (!obra) {
      throw new Error("Error to fetch the data in database")
    }

    return obra
  }

  async edit (id: string, { title, publisher, photo, authors }: IObraRequest) {
    if (!id) {
      throw new Error("Missing route param")
    }

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

    await this.obraRepository.update(id, { title, publisher, photo, authors })
    
    const obra = await this.obraRepository.findOne(id)

    if (!obra) {
      throw new Error("Error to update in database")
    }

    return obra
  }

  async delete (id: string) {
    const obra = await this.obraRepository.findOne(id)

    if (!obra) {
      throw new Error("Invalid route param")
    }

    await this.obraRepository.delete(id)

    return { message: "Successful request" }
  }
}

export { ObraService }