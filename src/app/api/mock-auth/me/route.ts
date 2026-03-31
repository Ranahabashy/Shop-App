import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyAccessToken } from '@lib/auth-token';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('solid-shop-token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await verifyAccessToken(token);
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
