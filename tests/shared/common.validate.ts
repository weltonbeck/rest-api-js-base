export const pagingValidation = (data: unknown) => {
  expect(data).toHaveProperty('totalItens')
  expect(data).toHaveProperty('currentPage')
  expect(data).toHaveProperty('totalPages')
  expect(data).toHaveProperty('limit')
}
