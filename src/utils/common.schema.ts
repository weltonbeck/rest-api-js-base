import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

export const idProps = {
  id: z.string(),
}

export const commonProps = {
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}

export const idSchema = z.object(idProps)

const errorSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  errors: z.array(z.string()),
})

export const { schemas: commonsSchemas, $ref: $refCommon } = buildJsonSchemas(
  {
    idSchema,
    errorSchema,
  },
  { $id: 'commonsSchemas' },
)
