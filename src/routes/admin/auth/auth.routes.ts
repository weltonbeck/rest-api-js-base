import { FastifyInstance } from 'fastify'
import { adminAuthMiddleware } from '../../../middlewares/adminAuth.middleware'
import {
  $ref as $refAdministrators,
  administratorSchemas,
} from '../administrators/administrators.schema'
import { login, myUser } from './auth.controller'
import { $ref, authSchemas } from './auth.schema'

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
    },
    handler: login,
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
    handler: myUser,
  })
}
