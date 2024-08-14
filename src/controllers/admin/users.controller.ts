import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUser, UpdateUser } from '../../models/interfaces/user.interface'
import { UserRepository } from '../../models/repositories/user.repository'
import { Id } from '../../utils/common.interface'
import { customError } from '../../utils/errors/customError'

export const list = async (request: FastifyRequest, reply: FastifyReply) => {
  const userRepository = new UserRepository()

  const data = await userRepository.findAll()

  return reply.send({
    success: true,
    data,
  })
}

export const getOne = async (
  request: FastifyRequest<{
    Params: Id
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.params

  const userRepository = new UserRepository()

  const user = await userRepository.findById(id)

  if (!user) {
    throw customError('Not found')
  }

  return reply.send({
    success: true,
    data: user,
  })
}

export const create = async (
  request: FastifyRequest<{
    Body: CreateUser
  }>,
  reply: FastifyReply,
) => {
  const { body } = request

  const userRepository = new UserRepository()

  const user = await userRepository.create(body)

  return reply.code(201).send({ success: true, data: user })
}

export const update = async (
  request: FastifyRequest<{
    Params: Id
    Body: UpdateUser
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.params
  const { body } = request

  const userRepository = new UserRepository()

  const user = await userRepository.findById(id)

  if (!user) {
    throw customError('Not found')
  }

  const newUser = await userRepository.update(id, body)

  return reply.send({ success: true, data: newUser })
}

export const remove = async (
  request: FastifyRequest<{
    Params: Id
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.params

  const userRepository = new UserRepository()

  const user = await userRepository.findById(id)

  if (!user) {
    throw customError('Not found')
  }

  const result = await userRepository.delete(id)

  return reply.send({ success: result })
}
