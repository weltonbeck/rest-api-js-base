import { FastifyInstance } from 'fastify'
import {
  routeCreateParams,
  routeDeleteParams,
  routeGetOneParams,
  routeListParams,
  routeUpdateParams,
} from '../crud.routes'
import { AdministratorsController } from './administrators.controller'
import { administratorSchemas, $ref } from './administrators.schema'

const administratorsController = new AdministratorsController()
export const administratorRoutes = async (app: FastifyInstance) => {
  for (const schema of administratorSchemas) {
    app.addSchema(schema)
  }

  app.get(
    '/',
    routeListParams(
      administratorsController,
      $ref('administratorsSearchAndPaginateQuerySchema'),
      $ref('publicAdministratorSchema'),
    ),
  )

  app.get(
    '/:id',
    routeGetOneParams(
      administratorsController,
      $ref('publicAdministratorSchema'),
    ),
  )

  app.post(
    '/',
    routeCreateParams(
      administratorsController,
      $ref('createAdministratorSchema'),
      $ref('publicAdministratorSchema'),
    ),
  )

  app.put(
    '/:id',
    routeUpdateParams(
      administratorsController,
      $ref('updateAdministratorSchema'),
      $ref('publicAdministratorSchema'),
    ),
  )

  app.delete('/:id', routeDeleteParams(administratorsController))
}
