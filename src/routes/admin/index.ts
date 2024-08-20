import { FastifyInstance } from 'fastify'
import { adminAuthMiddleware } from '../../middlewares/adminAuth.middleware'
import { userRoutes } from './user.routes'

export const adminRoutes = async (app: FastifyInstance) => {
  app.addHook('preHandler', adminAuthMiddleware)

  app.register(userRoutes, { prefix: 'users' })
}
