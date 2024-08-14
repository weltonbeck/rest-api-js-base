import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

export const idProps = {
  id: z.string().uuid(),
}

export const commonProps = {
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}

export const idSchema = z.object(idProps)

const errorSchema = z.object({
  statusCode: z.number(),
  code: z.string(),
  message: z.string(),
  error: z.string(),
  errors: z
    .array(
      z.object({
        property: z.string(),
        message: z.string(),
      }),
    )
    .optional(),
})

export const { schemas: commonsSchemas, $ref: $refCommon } = buildJsonSchemas(
  {
    idSchema,
    errorSchema,
  },
  { $id: 'commonsSchemas' },
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertAllPropsToOptional = (obj: any): any => {
  const data = { ...obj }
  const keys = Object.keys(data)
  keys.forEach((key) => {
    data[key] = data[key].optional()
  })
  return data
}
