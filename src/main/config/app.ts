import setupRoutes from './routes'
import setupMiddleweres from './middleweres'
import express from 'express'

const app = express()
setupMiddleweres(app)
setupRoutes(app)

export { app }