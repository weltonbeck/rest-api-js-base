import { FastifyInstance } from 'fastify'
import { pagesRoutes } from '../modules/pages/routes/pagesRoutes'
import { userRoutes } from '../modules/users/routes/userRoutes'

export const routes = async (app: FastifyInstance) => {
  app.register(pagesRoutes)
  app.register(userRoutes, { prefix: 'users' })
}
