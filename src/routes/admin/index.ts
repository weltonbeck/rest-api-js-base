import { FastifyInstance } from 'fastify'
import { userRoutes } from './user.routes'

export const adminRoutes = async (app: FastifyInstance) => {
  app.register(userRoutes, { prefix: 'users' })
}
