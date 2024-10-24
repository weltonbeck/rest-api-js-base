/* eslint-disable @typescript-eslint/no-explicit-any */
import z from 'zod'
import { Paginate } from '../../shared/common.interface'
import { customError } from '../../utils/errors/customError'

type OptionsFindEntity = {
  limit?: number
  page?: number
  where?: object
  include?: object
  fields?: object
  orderBy?: object
}

export class AppRepository<
  Entity extends z.infer<any>,
  CreateEntity extends z.infer<any>,
  UpdateEntity extends z.infer<any>,
> {
  protected entity

  constructor(e: any) {
    this.entity = e
  }

  async parse(data: Entity): Promise<Entity> {
    await Promise.all([])
    return data as Entity
  }

  fields() {
    return Object.keys(this.entity.fields)
  }

  async findOne(where: any): Promise<Entity | null> {
    const result = await this.entity.findFirst({
      where,
    })
    if (result) {
      const output = await this.parse(result)
      return output
    }
    return null
  }

  async findById(id: string): Promise<Entity | null> {
    const result = await this.findOne({
      id,
    })
    return result
  }

  async create(data: CreateEntity): Promise<Entity> {
    const result = await this.entity.create({
      data,
    })

    const output = await this.parse(result)
    return output
  }

  async update(id: string, data: UpdateEntity): Promise<Entity> {
    const result = await this.entity.update({
      where: {
        id,
      },
      data,
    })

    const output = await this.parse(result)
    return output
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.entity.delete({
      where: {
        id,
      },
    })

    return !!result
  }

  async count(options: OptionsFindEntity = {}): Promise<number> {
    const count = await this.entity.count({
      where: options.where,
      include: options.include,
    })
    return count || 0
  }

  async findMany(options: OptionsFindEntity = {}): Promise<Entity[]> {
    if (options.orderBy) {
      const fields = this.fields()
      Object.keys(options.orderBy).forEach((field: any) => {
        if (!fields.includes(field)) {
          throw customError(`field ${field} not exists`)
        }
      })
    }

    const results = await this.entity.findMany({
      where: options.where,
      include: options.include,
      fields: options.fields,
      take: options.limit,
      skip: (options.page || 0) - 1,
      orderBy: options.orderBy,
    })

    const output = await Promise.all(
      results.map((result: Entity) => {
        return this.parse(result)
      }),
    )

    return output
  }

  async findManyPaginate(options: OptionsFindEntity = {}): Promise<{
    result: Entity[]
    paginate: Paginate
  }> {
    if (!options.limit) {
      options.limit = 20
    }

    const count = await this.count(options)
    const result = await this.findMany(options)

    const paginate = {
      totalItens: count,
      page: options.page || 1,
      totalPages: Math.ceil(count / options.limit),
      limit: options.limit,
    }

    return {
      result,
      paginate,
    }
  }
}
