import { z } from 'zod'
import { idSchema } from './common.schema'

export interface Id extends z.infer<typeof idSchema> {}
