import { FastifyReply, FastifyRequest } from 'fastify'
import { AdministratorRepository } from '../../../models/repositories/administrator.repository'
import {
  CreateAdministrator,
  UpdateAdministrator,
} from '../../../models/schema/administrator.schema'
import { Id, paginateQuery } from '../../../shared/common.interface'
import { customError } from '../../../utils/errors/customError'
import { AppController } from '../../app.controller'

export class AdministratorsController extends AppController {
  async list(
    request: FastifyRequest<{
      Querystring: paginateQuery
    }>,
    reply: FastifyReply,
  ) {
    const { limit, page, orderBy, orderDirection } = request.query

    const options = {
      limit,
      page,
      orderBy:
        orderBy && orderDirection
          ? { [String(orderBy)]: orderDirection }
          : { createdAt: 'asc' },
    }
    const administratorRepository = new AdministratorRepository()
    const data = await administratorRepository.findManyPaginate(options)

    return reply.send({
      success: true,
      data: data.result,
      paginate: data.paginate,
    })
  }

  async getOne(
    request: FastifyRequest<{
      Params: Id
    }>,
    reply: FastifyReply,
  ) {
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

  async create(
    request: FastifyRequest<{
      Body: CreateAdministrator
    }>,
    reply: FastifyReply,
  ) {
    const { body } = request

    const administratorRepository = new AdministratorRepository()
    const administrator = await administratorRepository.create(body)

    return reply.code(201).send({ success: true, data: administrator })
  }

  async update(
    request: FastifyRequest<{
      Params: Id
      Body: UpdateAdministrator
    }>,
    reply: FastifyReply,
  ) {
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

  async remove(
    request: FastifyRequest<{
      Params: Id
    }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params

    const administratorRepository = new AdministratorRepository()
    const administrator = await administratorRepository.findById(id)

    if (!administrator) {
      throw customError('Not found')
    }

    const result = await administratorRepository.delete(id)

    return reply.send({ success: result })
  }
}
