import { FastifyReply, FastifyRequest } from 'fastify'
import { getAuthMe } from '../../../middlewares/adminAuth.middleware'
import { AdministratorRepository } from '../../../models/repositories/administrator.repository'
import { customError } from '../../../utils/errors/customError'
import { compareHash } from '../../../utils/hash'
import { jwtSign } from '../../../utils/jwt'
import { AppController } from '../../app.controller'
import { Login } from './auth.schema'

export class AuthController extends AppController {
  async login(
    request: FastifyRequest<{
      Body: Login
    }>,
    reply: FastifyReply,
  ) {
    const { body } = request

    const administratorRepository = new AdministratorRepository()

    const administrator = await administratorRepository.findOne({
      email: body.email,
    })

    if (administrator) {
      const passwordMatch = await compareHash(
        body.password,
        administrator.password,
      )

      if (passwordMatch) {
        const token = jwtSign({
          id: administrator.id,
        })
        return reply.send({ success: true, data: { token } })
      }
    }

    throw customError('your email or password is incorrect')
  }

  async getMe(request: FastifyRequest, reply: FastifyReply) {
    const administrator = getAuthMe(request)
    return reply.send({ success: true, data: administrator })
  }
}
