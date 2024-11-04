import { paginateQuery } from '../shared/common.interface'

export const parsePaginateQuery = (query: paginateQuery) => {
  const { limit, page, orderBy, orderDirection } = query

  const options = {
    limit: Number(limit) || 25,
    page: Number(page) || 1,
    orderBy:
      orderBy && orderDirection
        ? { [String(orderBy)]: orderDirection }
        : { createdAt: 'asc' },
  }

  return options
}
