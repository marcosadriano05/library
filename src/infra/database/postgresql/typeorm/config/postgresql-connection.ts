import ormconfig from './ormconfig'
import { createConnection, ConnectionOptions } from 'typeorm'

const config = ormconfig as ConnectionOptions

export const postgresqlConnection = async () => {
  const connection = await createConnection(config)
  return connection
}