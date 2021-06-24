import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('obras')
export class Obra {

  @PrimaryColumn()
  readonly id: string

  @Column()
  title: string

  @Column()
  publisher: string

  @Column()
  photo: string

  @Column('simple-array')
  authors: string[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
