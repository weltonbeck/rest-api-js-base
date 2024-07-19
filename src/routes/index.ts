import { FastifyInstance } from 'fastify'
import { adminRoutes } from './admin'
import { pagesRoutes } from './pages.routes'

export const routes = async (app: FastifyInstance) => {
  app.register(pagesRoutes)

  app.register(adminRoutes, { prefix: 'admin' })
}
