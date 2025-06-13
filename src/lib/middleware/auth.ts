import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

export async function authMiddleware(request: AuthenticatedRequest) {
  try {
    const token = request.headers.get('cookie')?.split('token=')[1]?.split(';')[0];

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload = await verifyJwt(token);
    request.user = payload;
    return null;
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
} 