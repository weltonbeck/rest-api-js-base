import jwt from 'jsonwebtoken'

const JWT_SECRET = String(process.env.JWT_SECRET)

export const jwtVerify = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (err) {
    return false
  }
}

export const jwtSign = (payload: unknown) => {
  return jwt.sign(JSON.stringify(payload), JWT_SECRET)
}

export const jwtDecode = (token: string) => {
  const verify = jwtVerify(token)
  if (verify) {
    const data = jwt.decode(token)
    if (data) {
      return JSON.parse(String(data))
    }
  }
  return null
}
