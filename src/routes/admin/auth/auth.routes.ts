import { FastifyInstance } from 'fastify'
import { adminAuthMiddleware } from '../../../middlewares/adminAuth.middleware'
import {
  $ref as $refAdministrators,
  administratorSchemas,
} from '../administrators/administrators.schema'
import { AuthController } from './auth.controller'
import { $ref, authSchemas } from './auth.schema'

const authController = new AuthController()

export const authRoutes = async (app: FastifyInstance) => {
  for (const schema of authSchemas) {
    app.addSchema(schema)
  }
  for (const schema of administratorSchemas) {
    app.addSchema(schema)
  }

  app.post('/login', {
    schema: {
      body: $ref('loginSchema'),
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              token: { type: 'string' },
            },
          },
        },
      },
      security: [],
    },
    handler: authController.login,
  })

  app.get('/me', {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: $refAdministrators('publicAdministratorSchema'),
          },
        },
      },
    },
    preHandler: [adminAuthMiddleware],
    handler: authController.getMe,
  })
}
