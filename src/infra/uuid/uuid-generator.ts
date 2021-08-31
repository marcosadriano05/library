import { UuidGenerator } from "../../application/protocols/uuid"

import { v4 as uuid } from 'uuid'

export class UuidGeneratorImpl implements UuidGenerator {
  generate () {
    return uuid()
  }
}