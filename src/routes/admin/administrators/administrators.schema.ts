import { buildJsonSchemas } from 'fastify-zod'
import {
  createAdministratorSchema,
  publicAdministratorSchema,
  updateAdministratorSchema,
} from '../../../models/schema/administrator.schema'

export const { schemas: administratorSchemas, $ref } = buildJsonSchemas(
  {
    publicAdministratorSchema,
    createAdministratorSchema,
    updateAdministratorSchema,
  },
  { $id: 'administratorSchemas' },
)
