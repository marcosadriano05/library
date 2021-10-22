import { EntityRepository, Repository } from 'typeorm'
import { BookEntity } from '../entities/book-entity-typeorm'

@EntityRepository(BookEntity)
export class BookEntityRepository extends Repository<BookEntity> {}