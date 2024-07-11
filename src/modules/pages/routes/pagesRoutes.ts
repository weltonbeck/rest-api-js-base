import { FastifyInstance } from 'fastify'
import { healthcheck } from '../controllers/pagesControler'

export const pagesRoutes = async (app: FastifyInstance) => {
  app.get('/', {
    schema: {
      tags: ['Default'],
      response: {
        200: {
          type: 'object',
          properties: {
            status: { type: 'string' },
          },
        },
      },
    },
    handler: healthcheck,
  })
}
