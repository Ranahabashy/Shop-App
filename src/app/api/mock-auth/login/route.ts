import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createAccessToken } from '@lib/auth-token';
import { getUsersStore } from '@lib/mock-users';
import type { User } from '@domain/entities/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const users = getUsersStore();

  const localUser = users.find(
    (user) => user.email === body.email && user.password === body.password
  );

  if (!localUser) {
    return NextResponse.json(
      { message: 'Invalid email or password' },
      { status: 401 }
    );
  }

  const user: User = {
    id: localUser.id,
    firstName: localUser.firstName,
    lastName: localUser.lastName,
    email: localUser.email,
  };

  const accessToken = await createAccessToken(user);
  const cookieStore = await cookies();

  cookieStore.set('solid-shop-token', accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });

  return NextResponse.json({ accessToken, user });
}