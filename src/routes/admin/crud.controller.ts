/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { Id, searchAndPaginateQuery } from '../../shared/common.interface'
import { customError } from '../../utils/errors/customError'
import { parsePaginateQuery } from '../../utils/helpers'
import { AppController } from '../app.controller'

export class CrudController<
  CreateEntity extends z.infer<any>,
  UpdateEntity extends z.infer<any>,
> extends AppController {
  protected repository
  constructor(e: any) {
    super()
    this.repository = e
  }

  async list(
    request: FastifyRequest<{
      Querystring: searchAndPaginateQuery
    }>,
    reply: FastifyReply,
  ) {
    const options = parsePaginateQuery(request.query)
    const data = await this.repository.findManyPaginate({
      ...options,
      search: request.query,
    })

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

    const data = await this.repository.findById(id)

    if (!data) {
      throw customError('Not found')
    }

    return reply.send({
      success: true,
      data,
    })
  }

  async create(
    request: FastifyRequest<{
      Body: CreateEntity
    }>,
    reply: FastifyReply,
  ) {
    const { body } = request

    const data = await this.repository.create(body as any)

    return reply.code(201).send({ success: true, data })
  }

  async update(
    request: FastifyRequest<{
      Params: Id
      Body: UpdateEntity
    }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params
    const { body } = request

    const data = await this.repository.findById(id)

    if (!data) {
      throw customError('Not found')
    }

    const newEntity = await this.repository.update(id, body as any)

    return reply.send({ success: true, data: newEntity })
  }

  async remove(
    request: FastifyRequest<{
      Params: Id
    }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params

    const data = await this.repository.findById(id)

    if (!data) {
      throw customError('Not found')
    }

    const result = await this.repository.delete(id)

    return reply.send({ success: result })
  }
}
