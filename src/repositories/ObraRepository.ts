import { EntityRepository, Repository } from 'typeorm'
import { Obra } from '../entities/Obra'

@EntityRepository(Obra)
class ObraRepository extends Repository<Obra> {}

export { ObraRepository }