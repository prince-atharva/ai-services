import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

interface TokenPayload {
  userId: number
  email: string
}

export async function signJwt(payload: TokenPayload): Promise<string> {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  })
}

export async function verifyJwt(token: string): Promise<TokenPayload> {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload
  } catch (error) {
    throw new Error('Invalid token')
  }
} 