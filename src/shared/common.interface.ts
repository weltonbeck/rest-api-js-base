import { z } from 'zod'
import { idSchema, paginateSchema, paginateQuerySchema } from './common.schema'

export interface Id extends z.infer<typeof idSchema> {}
export interface Paginate extends z.infer<typeof paginateSchema> {}
export interface paginateQuery extends z.infer<typeof paginateQuerySchema> {}
