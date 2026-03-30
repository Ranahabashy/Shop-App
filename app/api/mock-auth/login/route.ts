import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createAccessToken } from '@/src/lib/auth-token';
import { getUsersStore } from '@/src/lib/mock-users';
import { upstreamHttpClient } from '@/src/infrastructure/http/http-client';
import type { User } from '@/src/domain/entities/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const users = getUsersStore();

  const localUser = users.find(
    (user) => user.username === body.username && user.password === body.password
  );

  if (localUser) {
    const user: User = {
      id: localUser.id,
      firstName: localUser.firstName,
      lastName: localUser.lastName,
      email: localUser.email,
      username: localUser.username,
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

  try {
    const response = await upstreamHttpClient.post('/auth/login', {
      username: body.username,
      password: body.password,
      expiresInMins: 60,
    });

    const user: User = {
      id: String(response.data.id),
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      email: response.data.email,
      username: response.data.username,
    };

    const accessToken = await createAccessToken(user);
    const cookieStore = await cookies();

    cookieStore.set('solid-shop-token', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    });

    return NextResponse.json({ accessToken, user });
  } catch {
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  }
}