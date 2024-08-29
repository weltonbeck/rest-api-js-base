import 'dotenv/config'
import fastify from 'fastify'
import { routes } from './routes'
import { swaggerRoutes } from './swagger.config'
import { commonsSchemas } from './shared/common.schema'
import { errorHandler } from './utils/errors/errorHandler'

const app = fastify({
  // logger: true,
  ajv: {
    customOptions: {
      allErrors: true,
    },
  },
})

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

app.setErrorHandler(errorHandler)

export default app
