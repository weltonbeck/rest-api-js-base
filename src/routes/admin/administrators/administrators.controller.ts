import { FastifyReply, FastifyRequest } from 'fastify'
import {
  CreateAdministrator,
  UpdateAdministrator,
} from '../../../models/schema/administrator.schema'
import { AdministratorRepository } from '../../../models/repositories/administrator.repository'
import { Id } from '../../../shared/common.interface'
import { customError } from '../../../utils/errors/customError'

export const list = async (request: FastifyRequest, reply: FastifyReply) => {
  const administratorRepository = new AdministratorRepository()

  const data = await administratorRepository.findAll()

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

  const administratorRepository = new AdministratorRepository()

  const administrator = await administratorRepository.findById(id)

  if (!administrator) {
    throw customError('Not found')
  }

  return reply.send({
    success: true,
    data: administrator,
  })
}

export const create = async (
  request: FastifyRequest<{
    Body: CreateAdministrator
  }>,
  reply: FastifyReply,
) => {
  const { body } = request

  const administratorRepository = new AdministratorRepository()

  const administrator = await administratorRepository.create(body)

  return reply.code(201).send({ success: true, data: administrator })
}

export const update = async (
  request: FastifyRequest<{
    Params: Id
    Body: UpdateAdministrator
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.params
  const { body } = request

  const administratorRepository = new AdministratorRepository()

  const administrator = await administratorRepository.findById(id)

  if (!administrator) {
    throw customError('Not found')
  }

  const newAdministrator = await administratorRepository.update(id, body)

  return reply.send({ success: true, data: newAdministrator })
}

export const remove = async (
  request: FastifyRequest<{
    Params: Id
  }>,
  reply: FastifyReply,
) => {
  const { id } = request.params

  const administratorRepository = new AdministratorRepository()

  const administrator = await administratorRepository.findById(id)

  if (!administrator) {
    throw customError('Not found')
  }

  const result = await administratorRepository.delete(id)

  return reply.send({ success: result })
}
