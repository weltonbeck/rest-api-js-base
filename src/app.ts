import 'dotenv/config'
import fastify from 'fastify'
import { routes } from './routes'

const app = fastify()
app.register(routes)

export default app
