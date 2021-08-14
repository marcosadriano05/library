require('dotenv').config()

const SOURCE_PATH = process.env.NODE_ENV === 'production' ? 'dist' : 'src'

module.exports = {
  type: "sqlite",
  database: "src/database/database.sqlite",
  migrations: [`${SOURCE_PATH}/database/migrations/**/*.{ts,js}`],
  entities: [`${SOURCE_PATH}/entities/**/*.{ts,js}`],
  cli: {
    migrationsDir: "src/database/migrations",
    entitiesDir: "src/entities"
  }
}