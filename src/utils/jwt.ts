import jwt from 'jsonwebtoken'

const JWT_SECRET = String(process.env.JWT_SECRET)

export const jwtVerify = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (err) {
    return false
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const jwtSign = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET)
}

export const jwtDecode = (token: string) => {
  const verify = jwtVerify(token)
  if (verify) {
    const data = jwt.decode(token)
    if (data) {
      if (typeof data === 'object') {
        return data
      }
    }
  }
  return null
}
