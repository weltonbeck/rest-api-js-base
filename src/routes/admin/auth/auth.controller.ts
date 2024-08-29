import { FastifyReply, FastifyRequest } from 'fastify'
import { AdministratorRepository } from '../../../models/repositories/administrator.repository'
import { customError } from '../../../utils/errors/customError'
import { compareHash } from '../../../utils/hash'
import { jwtSign } from '../../../utils/jwt'
import { Login } from './auth.schema'

export const login = async (
  request: FastifyRequest<{
    Body: Login
  }>,
  reply: FastifyReply,
) => {
  const { body } = request

  const administratorRepository = new AdministratorRepository()

  const administrator = await administratorRepository.findFirst({
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

export const myUser = async (request: FastifyRequest, reply: FastifyReply) => {
  return reply.send({ success: true })
}
