import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'
import { commonProps, idProps } from '../../utils/common.schema'

export const userProps = {
  name: z.string({
    required_error: 'The name cannot be empty',
  }),
  email: z
    .string({
      required_error: 'The name cannot be empty',
    })
    .email(),
}

export const userSchema = z.object({
  ...idProps,
  ...userProps,
  ...commonProps,
})

export const createUserSchema = z.object(userProps)
export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
})

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    userSchema,
    createUserSchema,
    updateUserSchema,
  },
  { $id: 'userSchemas' },
)
