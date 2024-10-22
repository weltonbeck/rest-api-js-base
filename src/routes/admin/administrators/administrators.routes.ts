import { FastifyInstance } from 'fastify'
import { adminAuthMiddleware } from '../../../middlewares/adminAuth.middleware'
import { $refCommon } from '../../../shared/common.schema'
import {
  list,
  getOne,
  create,
  update,
  remove,
} from './administrators.controller'
import { administratorSchemas, $ref } from './administrators.schema'

export const administratorRoutes = async (app: FastifyInstance) => {
  for (const schema of administratorSchemas) {
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
              items: $ref('publicAdministratorSchema'),
            },
            paging: $refCommon('pagingSchema'),
          },
        },
      },
    },
    preHandler: [adminAuthMiddleware],
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
            data: $ref('publicAdministratorSchema'),
          },
        },
        404: $refCommon('errorSchema'),
      },
    },
    preHandler: [adminAuthMiddleware],
    handler: getOne,
  })

  app.post('/', {
    schema: {
      body: $ref('createAdministratorSchema'),
      response: {
        201: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: $ref('publicAdministratorSchema'),
          },
        },
      },
    },
    preHandler: [adminAuthMiddleware],
    handler: create,
  })

  app.put('/:id', {
    schema: {
      params: $refCommon('idSchema'),
      body: $ref('updateAdministratorSchema'),
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: $ref('publicAdministratorSchema'),
          },
        },
        404: $refCommon('errorSchema'),
      },
    },
    preHandler: [adminAuthMiddleware],
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
    preHandler: [adminAuthMiddleware],
    handler: remove,
  })
}
