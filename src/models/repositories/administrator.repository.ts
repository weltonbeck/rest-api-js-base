import { prisma } from '../../utils/database/prismaClient'
import { customError } from '../../utils/errors/customError'
import { generateHash } from '../../utils/hash'
import {
  Administrator,
  CreateAdministrator,
  UpdateAdministrator,
} from '../schema/administrator.schema'
import { AppRepository, OptionsFindEntity } from './app.repository'

export class AdministratorRepository extends AppRepository<
  Administrator,
  CreateAdministrator,
  UpdateAdministrator
> {
  constructor() {
    super(prisma.administrator)
  }

  parseWhere(options: OptionsFindEntity = {}) {
    options.where = options.where || {}
    if (options.search) {
      if (options.search.name) {
        options.where = Object.assign(options.where, {
          name: { contains: options.search.name },
        })
      }
      if (options.search.email) {
        options.where = Object.assign(options.where, {
          email: { contains: options.search.email },
        })
      }
      if (options.search.status) {
        options.where = Object.assign(options.where, {
          status: options.search.status,
        })
      }
      if (options.search.search) {
        options.where = Object.assign(options.where, {
          AND: [
            {
              OR: [
                { name: { contains: options.search.search } },
                { email: { contains: options.search.search } },
              ],
            },
          ],
        })
      }
    }

    return super.parseWhere(options)
  }

  async create(data: CreateAdministrator): Promise<Administrator> {
    if (data.email) {
      const administrator = await this.findOne({
        email: data.email,
      })
      if (administrator) {
        throw customError('Email already exists')
      }
    }

    if (data.password) {
      data.password = await generateHash(data.password)
    }

    return await super.create(data)
  }

  async update(id: string, data: UpdateAdministrator): Promise<Administrator> {
    if (data.email) {
      const administrator = await this.findOne({
        email: data.email,
        id: { not: id },
      })
      if (administrator) {
        throw customError('Email already exists')
      }
    }

    return await super.update(id, data)
  }
}
