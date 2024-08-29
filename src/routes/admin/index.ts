import { FastifyInstance } from 'fastify'
import { administratorRoutes } from './administrators/administrators.routes'
import { authRoutes } from './auth/auth.routes'

export const adminRoutes = async (app: FastifyInstance) => {
  app.register(authRoutes)
  app.register(administratorRoutes, {
    prefix: 'administrators',
  })
}
