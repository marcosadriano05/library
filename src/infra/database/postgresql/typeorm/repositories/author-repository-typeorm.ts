import { EntityRepository, Repository } from 'typeorm'
import { AuthorEntity } from '../entities/author-entity-typeorm'

@EntityRepository(AuthorEntity)
export class AuthorEntityRepository extends Repository<AuthorEntity> {}