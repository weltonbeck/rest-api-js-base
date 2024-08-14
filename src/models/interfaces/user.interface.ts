import { z } from 'zod'
import {
  createUserSchema,
  updateUserSchema,
  userSchema,
} from '../schemas/user.schema'

export interface User extends z.infer<typeof userSchema> {}

export interface CreateUser extends z.infer<typeof createUserSchema> {}
export interface UpdateUser extends z.infer<typeof updateUserSchema> {}
