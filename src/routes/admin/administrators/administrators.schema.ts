import { buildJsonSchemas } from 'fastify-zod'
import { Status } from '@prisma/client'
import z from 'zod'
import {
  createAdministratorSchema,
  publicAdministratorSchema,
  updateAdministratorSchema,
} from '../../../models/schema/administrator.schema'
import {
  paginateQuerySchema,
  searchQuerySchema,
} from '../../../shared/common.schema'

const administratorsSearchAndPaginateQuerySchema = z.object({
  ...paginateQuerySchema.shape,
  ...searchQuerySchema.shape,
  name: z.string().optional(),
  email: z.string().optional(),
  status: z.nativeEnum(Status).optional(),
})

export const { schemas: administratorSchemas, $ref } = buildJsonSchemas(
  {
    publicAdministratorSchema,
    createAdministratorSchema,
    updateAdministratorSchema,
    administratorsSearchAndPaginateQuerySchema,
  },
  { $id: 'administratorSchemas' },
)
