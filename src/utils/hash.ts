import { hash, compare } from 'bcrypt'

export const generateHash = async (payload: string): Promise<string> => {
  return hash(payload, 10)
}

export const compareHash = async (
  payload: string,
  hashed: string,
): Promise<boolean> => {
  return compare(payload, hashed)
}
