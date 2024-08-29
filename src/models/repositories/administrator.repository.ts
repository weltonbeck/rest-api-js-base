import { prisma } from '../../utils/database/prismaClient'
import { customError } from '../../utils/errors/customError'
import { generateHash } from '../../utils/hash'
import {
  Administrator,
  CreateAdministrator,
  UpdateAdministrator,
} from '../schema/administrator.schema'

export class AdministratorRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async findFirst(where: any): Promise<Administrator | null> {
    const result = await prisma.administrator.findFirst({
      where,
    })
    return (result as Administrator) || null
  }

  async findById(id: string): Promise<Administrator | null> {
    const result = await this.findFirst({
      id,
    })
    return (result as Administrator) || null
  }

  async findAll(
    limit: number = 20,
    page: number = 0,
    // search: string | null = null,
  ): Promise<Administrator[]> {
    const where = {}

    // if (search) {
    //   Object.assign(where, {
    //     OR: [
    //       {
    //         name: {
    //           contains: search,
    //           mode: 'insensitive',
    //         },
    //       },
    //     ],
    //   })
    // }
    const result = await prisma.administrator.findMany({
      where,
      take: limit,
      skip: page,
    })

    // const paging = {
    //   total_itens: count,
    //   page,
    //   total_pages: Math.ceil(count / limit),
    //   limit,
    // }

    return result as Administrator[]
  }

  async count(limit: number = 20, page: number = 0): Promise<number> {
    const count = await prisma.administrator.count({
      take: limit,
      skip: page,
    })
    return count || 0
  }

  async create(data: CreateAdministrator): Promise<Administrator> {
    if (data.email) {
      const administrator = await this.findFirst({
        email: data.email,
      })
      if (administrator) {
        throw customError('Email already exists')
      }
    }

    if (data.password) {
      data.password = await generateHash(data.password)
    }

    const result = await prisma.administrator.create({
      data,
    })
    return result as Administrator
  }

  async update(id: string, data: UpdateAdministrator): Promise<Administrator> {
    if (data.email) {
      const administrator = await this.findFirst({
        email: data.email,
        id: { not: id },
      })
      if (administrator) {
        throw customError('Email already exists')
      }
    }

    const result = await prisma.administrator.update({
      where: {
        id,
      },
      data,
    })

    return result as Administrator
  }

  async delete(id: string): Promise<boolean> {
    const result = await prisma.administrator.delete({
      where: {
        id,
      },
    })

    return !!result
  }
}
