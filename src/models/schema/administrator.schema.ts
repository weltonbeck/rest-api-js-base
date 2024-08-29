import { Status } from '@prisma/client'
import { z } from 'zod'
import {
  commonProps,
  convertAllPropsToOptional,
  idProps,
} from '../../shared/common.schema'

export const administratorProps = {
  name: z.string({
    required_error: 'The name cannot be empty',
  }),
  email: z
    .string({
      required_error: 'The name cannot be empty',
    })
    .email(),
  password: z.string({
    required_error: 'The password cannot be empty',
  }),
  status: z.nativeEnum(Status).optional(),
}

export const administratorSchema = z.object({
  ...idProps,
  ...administratorProps,
  ...commonProps,
})

export const publicAdministratorSchema = z.object({
  ...idProps,
  ...{
    name: administratorProps.name,
    email: administratorProps.email,
    status: administratorProps.status,
  },
  ...commonProps,
})

export const createAdministratorSchema = z.object(administratorProps)
export const updateAdministratorSchema = z.object(
  convertAllPropsToOptional(administratorProps),
)

export interface Administrator extends z.infer<typeof administratorSchema> {}

export interface CreateAdministrator
  extends z.infer<typeof createAdministratorSchema> {}
export interface UpdateAdministrator
  extends z.infer<typeof updateAdministratorSchema> {}
