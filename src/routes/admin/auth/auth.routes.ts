import { FastifyInstance } from 'fastify'
import { login, myUser } from './auth.controller'
import { $ref, authSchemas } from './auth.schema'

export const authRoutes = async (app: FastifyInstance) => {
  for (const schema of authSchemas) {
    app.addSchema(schema)
  }

  app.post(
    '/login',
    {
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
    },
    login,
  )

  app.get(
    '/me',
    {
      schema: {
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              // data: $ref('publicAdministratorSchema'),
            },
          },
        },
      },
    },
    myUser,
  )
}
