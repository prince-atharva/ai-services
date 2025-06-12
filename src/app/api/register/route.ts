import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { validateBody, userSchema } from '@/lib/validations'
import { hashPassword } from '@/lib/password'

export async function POST(request: Request) {
  try {
    const data = await validateBody(userSchema)(request)

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    const hashedPassword = await hashPassword(data.password)

    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Error creating user' },
      { status: 500 }
    )
  }
} 