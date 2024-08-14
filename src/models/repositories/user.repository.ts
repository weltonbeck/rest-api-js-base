import { prisma } from '../../utils/database'
import { CreateUser, UpdateUser, User } from '../interfaces/user.interface'

export class UserRepository {
  async findById(id: string): Promise<User | null> {
    const result = await prisma.user.findFirst({
      where: {
        id,
      },
    })
    return result || null
  }

  async findAll(
    limit: number = 20,
    page: number = 0,
    search: string | null = null,
  ): Promise<User[]> {
    const where = {}

    if (search) {
      Object.assign(where, {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      })
    }
    const result = await prisma.user.findMany({
      where,
      take: limit,
      skip: page,
    })

    // const count = await prisma.user.count({
    //   where,
    // })

    // const paging = {
    //   total_itens: count,
    //   page,
    //   total_pages: Math.ceil(count / limit),
    //   limit,
    // }

    return result
  }

  async create(data: CreateUser): Promise<User> {
    const result = await prisma.user.create({
      data,
    })
    return result
  }

  async update(id: string, data: UpdateUser): Promise<User> {
    const result = await prisma.user.update({
      where: {
        id,
      },
      data,
    })

    return result
  }

  async delete(id: string): Promise<boolean> {
    const result = await prisma.user.delete({
      where: {
        id,
      },
    })

    return !!result
  }
}
