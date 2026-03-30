import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createAccessToken } from '@/src/lib/auth-token';
import { getUsersStore } from '@/src/lib/mock-users';
import type { RegisterInput, User } from '@/src/domain/entities/auth';

export async function POST(request: Request) {
  const body = (await request.json()) as RegisterInput;
  const users = getUsersStore();

  const alreadyExists = users.some((user) => user.username === body.username || user.email === body.email);

  if (alreadyExists) {
    return NextResponse.json({ message: 'User already exists' }, { status: 409 });
  }

  const newUser = {
    id: `local-${Date.now()}`,
    ...body
  };

  users.push(newUser);

  const user: User = {
    id: newUser.id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
    username: newUser.username
  };

  const accessToken = await createAccessToken(user);
  const cookieStore = await cookies();
  cookieStore.set('solid-shop-token', accessToken, { httpOnly: true, sameSite: 'lax', path: '/' });

  return NextResponse.json({ accessToken, user }, { status: 201 });
}
