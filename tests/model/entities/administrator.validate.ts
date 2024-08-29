export const administratorValidation = (data: unknown) => {
  expect(data).toHaveProperty('id')
  expect(data).toHaveProperty('name')
  expect(data).toHaveProperty('email')
  expect(data).toHaveProperty('status')
}
