export const paginateValidation = (data: unknown) => {
  expect(data).toHaveProperty('totalItens')
  expect(data).toHaveProperty('totalPages')
  expect(data).toHaveProperty('page')
  expect(data).toHaveProperty('limit')
}
