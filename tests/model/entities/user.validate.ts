export const userValidation = (data: unknown) => {
  expect(data).toHaveProperty('id')
  expect(data).toHaveProperty('name')
  expect(data).toHaveProperty('email')
}
