import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const userDataInput = {
  name: z.string({
    required_error: 'The name cannot be empty',
  }),
  email: z
    .string({
      required_error: 'The name cannot be empty',
    })
    .email(),
}

const userDataGenerated = {
  id: z.number(),
}

export const userResponseSchema = z.object({
  ...userDataGenerated,
  ...userDataInput,
})

export const usersResponseSchema = z.array(userResponseSchema)

export const createUserRequestSchema = z.object(userDataInput)

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    createUserRequestSchema,
    userResponseSchema,
    usersResponseSchema,
  },
  { $id: 'userSchemas' },
)
