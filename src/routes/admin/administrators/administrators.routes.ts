import { FastifyInstance } from 'fastify'
import { adminAuthMiddleware } from '../../../middlewares/adminAuth.middleware'
import { $refCommon } from '../../../shared/common.schema'
import { AdministratorsController } from './administrators.controller'
import { administratorSchemas, $ref } from './administrators.schema'

const administratorsController = new AdministratorsController()

export const administratorRoutes = async (app: FastifyInstance) => {
  for (const schema of administratorSchemas) {
    app.addSchema(schema)
  }

  app.get('/', {
    schema: {
      // headers: {
      //   type: 'object',
      //   properties: {
      //     authorization: {
      //       type: 'string',
      //       description: 'api token',
      //     },
      //   },
      //   required: ['authorization'],
      // },
      querystring: $ref('administratorsSearchAndPaginateQuerySchema'),
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'array',
              items: $ref('publicAdministratorSchema'),
            },
            paginate: $refCommon('paginateSchema'),
          },
        },
      },
    },
    preHandler: [adminAuthMiddleware],
    handler: administratorsController.list,
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
    handler: administratorsController.getOne,
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
    handler: administratorsController.create,
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
    handler: administratorsController.update,
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
    handler: administratorsController.remove,
  })
}
