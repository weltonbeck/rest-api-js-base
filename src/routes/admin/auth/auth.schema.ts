import { buildJsonSchemas } from 'fastify-zod'
import z from 'zod'
import { administratorProps } from '../../../models/schema/administrator.schema'

const loginSchema = z.object({
  email: administratorProps.email,
  password: administratorProps.password,
})

export const { schemas: authSchemas, $ref } = buildJsonSchemas(
  {
    loginSchema,
  },
  { $id: 'authSchemas' },
)

export interface Login extends z.infer<typeof loginSchema> {}
