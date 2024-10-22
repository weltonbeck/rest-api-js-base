import { z } from 'zod'
import { idSchema, pagingSchema } from './common.schema'

export interface Id extends z.infer<typeof idSchema> {}
export interface Paging extends z.infer<typeof pagingSchema> {}
