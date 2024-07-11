import 'dotenv/config'
import fastify from 'fastify'
import { routes } from './routes/routes'
import { swaggerRoutes } from './routes/swagger'
import { commonsSchemas } from './schemas/commonSchemas'

const app = fastify()

app.register((server, _, done) => {
  if (process.env.SHOW_DOC && process.env.SHOW_DOC === 'true') {
    swaggerRoutes(server)
  }

  for (const schema of commonsSchemas) {
    server.addSchema(schema)
  }

  server.register(routes)
  done()
})

export default app
