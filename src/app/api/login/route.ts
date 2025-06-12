import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { validateBody, loginSchema } from '@/lib/validations'
import { comparePassword } from '@/lib/password'
import { signJwt } from '@/lib/jwt'

export async function POST(request: Request) {
  try {
    const data = await validateBody(loginSchema)(request)

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const isPasswordValid = await comparePassword(data.password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const token = await signJwt({
      userId: user.id,
      email: user.email,
    })

    const response = new NextResponse(null, {
      status: 200,
    })
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Error during login' },
      { status: 500 }
    )
  }
} 