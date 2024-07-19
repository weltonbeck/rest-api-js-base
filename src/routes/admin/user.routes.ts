import { FastifyInstance } from 'fastify'
import {
  list,
  getOne,
  create,
  update,
  remove,
} from '../../controllers/admin/users.controller'
import { userSchemas, $ref } from '../../models/schemas/user.schema'
import { $refCommon } from '../../utils/common.schema'

export const userRoutes = async (app: FastifyInstance) => {
  for (const schema of userSchemas) {
    app.addSchema(schema)
  }

  app.get('/', {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'array',
              items: $ref('userSchema'),
            },
          },
        },
      },
    },
    handler: list,
  })

  app.get('/:id', {
    schema: {
      params: $refCommon('idSchema'),
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: $ref('userSchema'),
          },
        },
        404: $refCommon('errorSchema'),
      },
    },
    handler: getOne,
  })

  app.post('/', {
    schema: {
      body: $ref('createUserSchema'),
      response: {
        201: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: $ref('userSchema'),
          },
        },
      },
    },
    handler: create,
  })

  app.put('/:id', {
    schema: {
      params: $refCommon('idSchema'),
      body: $ref('updateUserSchema'),
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: $ref('userSchema'),
          },
        },
        404: $refCommon('errorSchema'),
      },
    },
    handler: update,
  })

  app.delete('/:id', {
    schema: {
      params: $refCommon('idSchema'),
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
          },
        },
        404: $refCommon('errorSchema'),
      },
    },
    handler: remove,
  })
}
