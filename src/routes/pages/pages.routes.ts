import { FastifyInstance } from 'fastify'
import { PagesController } from './pages.controller'

const pagesController = new PagesController()

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
      security: [],
    },
    handler: pagesController.healthcheck,
  })
}
