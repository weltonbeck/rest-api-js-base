import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import {
  createUserSchema,
  updateUserSchema,
} from '../../models/schemas/user.schema'
import { idSchema } from '../../utils/common.schema'

let usersData = [
  {
    id: '1',
    name: 'Ciclano',
    email: 'ciclano@email.com',
  },
]

export const list = async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.send({
    success: true,
    data: usersData,
  })
}

export const getOne = async (
  request: FastifyRequest<{
    Params: z.infer<typeof idSchema>
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.params

  const user = usersData.find((user) => user.id === id)

  if (!user) {
    return reply.code(404).send({ error: 'Not found' })
  }

  return reply.send({
    success: true,
    data: user,
  })
}

export const create = async (
  request: FastifyRequest<{
    Body: z.infer<typeof createUserSchema>
  }>,
  reply: FastifyReply,
) => {
  const { name, email } = request.body

  const userTemp = {
    id: String(usersData.length + 1),
    name,
    email,
  }

  usersData.push(userTemp)

  return reply.code(201).send({ success: true, data: userTemp })
}

export const update = async (
  request: FastifyRequest<{
    Params: z.infer<typeof idSchema>
    Body: z.infer<typeof updateUserSchema>
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.params
  const { name, email } = request.body

  let user = usersData.find((user) => user.id === id)

  if (!user) {
    return reply.code(404).send({ error: 'Not found' })
  }

  usersData = usersData.map((user) =>
    user.id === id
      ? { ...user, name: name || user.name, email: email || user.email }
      : user,
  )

  user = usersData.find((user) => user.id === id)

  return reply.send({ success: true, data: user })
}

export const remove = async (
  request: FastifyRequest<{
    Params: z.infer<typeof idSchema>
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.params

  const user = usersData.find((user) => user.id === id)

  if (!user) {
    return reply.code(404).send({ error: 'Not found' })
  }

  usersData = usersData.filter((user) => {
    return user.id !== id
  })

  return reply.send({ success: true })
}
