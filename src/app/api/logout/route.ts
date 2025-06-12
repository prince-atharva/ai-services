import { NextResponse } from 'next/server'

export async function POST() {
  const response = new NextResponse(null, {
    status: 200,
  })

  response.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  })

  return response
} 