import { FastifyInstance } from 'fastify'
import { healthcheck } from './pages.controller'

export const pagesRoutes = async (app: FastifyInstance) => {
  app.get('/', {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
          },
        },
      },
    },
    handler: healthcheck,
  })
}
