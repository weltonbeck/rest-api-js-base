import 'dotenv/config'
import fastify from 'fastify'
import { routes } from './routes'
import { swaggerRoutes } from './swagger.config'
import { commonsSchemas } from './utils/common.schema'

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
