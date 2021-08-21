import { EntityRepository, Repository } from 'typeorm'
import { BookModel } from '../models/book'

@EntityRepository(BookModel)
export class BookRepository extends Repository<BookModel> {}
