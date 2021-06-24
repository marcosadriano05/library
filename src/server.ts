import 'reflect-metadata'
import express from 'express'

import './database'
import { route } from './routes'

const server = express()
server.use(express.json())
server.use(route)

server.listen(3333, () => console.log('Server on port 3333'))