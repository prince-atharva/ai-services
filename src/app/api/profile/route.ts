import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { authMiddleware, AuthenticatedRequest } from '@/lib/middleware/auth'

export async function GET(request: AuthenticatedRequest) {
  try {
    const authError = await authMiddleware(request);
    if (authError) return authError;

    const userId = request.user?.userId;

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: user });
  } catch (error) {
    console.error('Profile error:', error);
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
} 