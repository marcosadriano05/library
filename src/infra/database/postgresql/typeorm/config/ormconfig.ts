import { env } from '../../../../../main/config/env'

const SOURCE_PATH = env.nodeEnv === 'production' ? 'dist' : 'src'

export = {
  type: 'postgres',
  host: env.dbHost,
  port: Number(env.dbPort),
  username: env.dbUsername,
  password: env.dbPassword,
  database: env.dbDatabaseName,
  synchronize: true,
  migrations: [`${SOURCE_PATH}/infra/database/postgresql/typeorm/migrations/**/*.{ts,js}`],
  entities: [`${SOURCE_PATH}/infra/database/postgresql/typeorm/entities/**/*.{ts,js}`],
  cli: {
    migrationsDir: "src/infra/database/postgresql/typeorm/migrations",
    entitiesDir: "src/infra/database/postgresql/typeorm/entities"
  }
}