import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { idRequestSchema } from '../../../schemas/commonSchemas'
import { createUserRequestSchema } from '../schemas/userSchemas'

let usersData = [
  { id: 1, name: 'Ciclano' },
  { id: 2, name: 'Beltrano' },
  { id: 3, name: 'Fulano' },
]

export const get = async (
  request: FastifyRequest<{
    Params: z.infer<typeof idRequestSchema>
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.params

  const user = usersData.find((user) => Number(user.id) === id)

  if (!user) {
    return reply.code(404).send({ error: 'Not found' })
  }

  return reply.send(user)
}

export const list = async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.send(usersData)
}

export const create = async (
  request: FastifyRequest<{
    Body: z.infer<typeof createUserRequestSchema>
  }>,
  reply: FastifyReply,
) => {
  const { name, email } = request.body

  const userTemp = {
    id: usersData.length + 1,
    name,
    email,
  }

  usersData.push(userTemp)

  return reply.code(201).send(userTemp)
}

export const update = async (
  request: FastifyRequest<{
    Params: z.infer<typeof idRequestSchema>
    Body: z.infer<typeof createUserRequestSchema>
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.params
  const { name } = request.body

  let user = usersData.find((user) => Number(user.id) === id)

  if (!user) {
    return reply.code(404).send({ error: 'Not found' })
  }

  usersData = usersData.map((user) =>
    user.id === id ? { ...user, name } : user,
  )

  user = usersData.find((user) => Number(user.id) === id)

  return reply.send(user)
}

export const remove = async (
  request: FastifyRequest<{
    Params: z.infer<typeof idRequestSchema>
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.params

  const user = usersData.find((user) => Number(user.id) === id)

  if (!user) {
    return reply.code(404).send({ error: 'Not found' })
  }

  usersData = usersData.filter((user) => {
    return user.id !== id
  })

  return reply
}
