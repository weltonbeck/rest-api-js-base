import { FastifyInstance } from 'fastify'
import { $refCommon } from '../../../schemas/commonSchemas'
import {
  list,
  get,
  create,
  update,
  remove,
} from '../controllers/userController'
import { userSchemas, $ref } from '../schemas/userSchemas'

const defaultSchema = {
  tags: ['users'],
}

export const userRoutes = async (app: FastifyInstance) => {
  for (const schema of userSchemas) {
    app.addSchema(schema)
  }

  app.get('/', {
    schema: {
      ...defaultSchema,
      response: {
        200: $ref('usersResponseSchema'),
      },
    },
    handler: list,
  })

  app.get('/:id', {
    schema: {
      ...defaultSchema,
      params: $refCommon('idRequestSchema'),
      response: {
        200: $ref('userResponseSchema'),
        404: $refCommon('errorResponseSchema'),
      },
    },
    handler: get,
  })

  app.post('/', {
    schema: {
      ...defaultSchema,
      body: $ref('createUserRequestSchema'),
      response: {
        201: $ref('userResponseSchema'),
      },
    },
    handler: create,
  })

  app.put('/:id', {
    schema: {
      ...defaultSchema,
      params: $refCommon('idRequestSchema'),
      body: $ref('createUserRequestSchema'),
      response: {
        200: $ref('userResponseSchema'),
        404: $refCommon('errorResponseSchema'),
      },
    },
    handler: update,
  })

  app.delete('/:id', {
    schema: {
      ...defaultSchema,
      params: $refCommon('idRequestSchema'),
      response: {
        204: { type: 'null' },
        404: $refCommon('errorResponseSchema'),
      },
    },
    handler: remove,
  })
}
