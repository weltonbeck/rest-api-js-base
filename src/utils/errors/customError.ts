export const customError = (message: string, statusCode: number = 400) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const err = new Error(message) as any
  err.statusCode = statusCode
  return err
}
