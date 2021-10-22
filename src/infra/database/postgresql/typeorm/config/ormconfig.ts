import dotenv from 'dotenv'

dotenv.config()

const SOURCE_PATH = process.env.NODE_ENV === 'production' ? 'dist' : 'src'

export = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  migrations: [`${SOURCE_PATH}/infra/database/postgresql/typeorm/migrations/**/*.{ts,js}`],
  entities: [`${SOURCE_PATH}/infra/database/postgresql/typeorm/entities/**/*.{ts,js}`],
  cli: {
    migrationsDir: "src/infra/database/postgresql/typeorm/migrations",
    entitiesDir: "src/infra/database/postgresql/typeorm/entities"
  }
}