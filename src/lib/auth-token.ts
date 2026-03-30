import { SignJWT, jwtVerify } from 'jose';
import type { User } from '@/src/domain/entities/auth';

const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? 'solid-shop-secret');

export async function createAccessToken(user: User) {
  return new SignJWT({ user })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(secret);
}

export async function verifyAccessToken(token: string) {
  const result = await jwtVerify(token, secret);
  return result.payload.user as User;
}
