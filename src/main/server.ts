import { app } from './config/app'
import { env } from './config/env'
import { postgresqlConnection } from '../infra/database/postgresql/typeorm/config/postgresql-connection'
import 'reflect-metadata'

postgresqlConnection()
  .then(() => app.listen(env.port, () => console.log(`Server up on port ${env.port}`)))
  .catch(error => console.log(error))