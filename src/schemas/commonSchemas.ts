import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

export const idRequestSchema = z.object({
  id: z.number(),
})

const errorResponseSchema = z.object({
  message: z.string(),
  errors: z.array(z.string()),
})

export const { schemas: commonsSchemas, $ref: $refCommon } = buildJsonSchemas(
  {
    idRequestSchema,
    errorResponseSchema,
  },
  { $id: 'commonsSchemas' },
)
