import { prisma } from '../../utils/database/prismaClient'
import { customError } from '../../utils/errors/customError'
import { generateHash } from '../../utils/hash'
import {
  Administrator,
  CreateAdministrator,
  UpdateAdministrator,
} from '../schema/administrator.schema'
import { AppRepository } from './app.repository'

export class AdministratorRepository extends AppRepository<
  Administrator,
  CreateAdministrator,
  UpdateAdministrator
> {
  constructor() {
    super(prisma.administrator)
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
