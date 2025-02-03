import { adminAuthMiddleware } from '../../middlewares/adminAuth.middleware'
import { $refCommon } from '../../shared/common.schema'
import { CrudController } from './crud.controller'

export const routeListParams = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  crudController: CrudController<any, any>,
  searchAndPaginateQuerySchema: unknown,
  publicSchema: unknown,
) => {
  return {
    schema: {
      querystring: searchAndPaginateQuerySchema,
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: {
              type: 'array',
              items: publicSchema,
            },
            paginate: $refCommon('paginateSchema'),
          },
        },
      },
    },
    preHandler: [adminAuthMiddleware],
    handler: crudController.list.bind(crudController),
  }
}

export const routeGetOneParams = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  crudController: CrudController<any, any>,
  publicSchema: unknown,
) => {
  return {
    schema: {
      params: $refCommon('idSchema'),
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: publicSchema,
          },
        },
        404: $refCommon('errorSchema'),
      },
    },
    preHandler: [adminAuthMiddleware],
    handler: crudController.getOne.bind(crudController),
  }
}

export const routeCreateParams = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  crudController: CrudController<any, any>,
  createSchema: unknown,
  publicSchema: unknown,
) => {
  return {
    schema: {
      body: createSchema,
      response: {
        201: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: publicSchema,
          },
        },
      },
    },
    preHandler: [adminAuthMiddleware],
    handler: crudController.create.bind(crudController),
  }
}

export const routeUpdateParams = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  crudController: CrudController<any, any>,
  updateSchema: unknown,
  publicSchema: unknown,
) => {
  return {
    schema: {
      params: $refCommon('idSchema'),
      body: updateSchema,
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            data: publicSchema,
          },
        },
        404: $refCommon('errorSchema'),
      },
    },
    preHandler: [adminAuthMiddleware],
    handler: crudController.update.bind(crudController),
  }
}

export const routeDeleteParams = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  crudController: CrudController<any, any>,
) => {
  return {
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
    handler: crudController.remove.bind(crudController),
  }
}
