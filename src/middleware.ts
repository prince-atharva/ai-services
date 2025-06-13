import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicPaths = ['/', '/login', '/register']
const protectedPaths = ['/services']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value

  if (token && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/services', request.url))
  }

  const isProtected =
    protectedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  if (!token && isProtected) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/register', '/services', '/services/:path*'],
} 