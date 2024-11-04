import { z } from 'zod'
import {
  idSchema,
  paginateSchema,
  paginateQuerySchema,
  searchQuerySchema,
  searchAndPaginateQuerySchema,
} from './common.schema'

export interface Id extends z.infer<typeof idSchema> {}
export interface Paginate extends z.infer<typeof paginateSchema> {}
export interface paginateQuery extends z.infer<typeof paginateQuerySchema> {}
export interface searchQuery extends z.infer<typeof searchQuerySchema> {}
export interface searchAndPaginateQuery
  extends z.infer<typeof searchAndPaginateQuerySchema> {}
