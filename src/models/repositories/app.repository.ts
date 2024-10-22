/* eslint-disable @typescript-eslint/no-explicit-any */

import { Paging } from '../../shared/common.interface'

type OptionsFindEntity = {
  limit?: number
  page?: number
  where?: any
  orderBy?: any
}

export class AppRepository<Entity, CreateEntity, UpdateEntity> {
  protected entity

  constructor(e: any) {
    this.entity = e
  }

  async parse(data: Entity): Promise<Entity> {
    await Promise.all([])
    return data as Entity
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
      take: options.limit,
      skip: options.page,
      where: options.where,
    })
    return count || 0
  }

  async findMany(options: OptionsFindEntity = {}): Promise<Entity[]> {
    const results = await this.entity.findMany({
      where: options.where,
      take: options.limit,
      skip: options.page,
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
    paging: Paging
  }> {
    if (!options.limit) {
      options.limit = 20
    }

    const count = await this.count(options)
    const result = await this.findMany(options)

    const paging = {
      totalItens: count,
      currentPage: options.page || 1,
      totalPages: Math.ceil(count / options.limit),
      limit: options.limit,
    }

    return {
      result,
      paging,
    }
  }
}
