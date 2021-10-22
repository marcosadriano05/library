import { app } from './config/app'
import { postgresqlConnection } from '../infra/database/postgresql/typeorm/config/postgresql-connection'
import 'reflect-metadata'

postgresqlConnection()
  .then(() => app.listen(5050, () => console.log('Server on')))
  .catch(error => console.log(error))