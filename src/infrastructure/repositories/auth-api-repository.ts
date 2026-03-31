import type { AuthRepository } from '@domain/repositories/auth-repository';
import type { AuthSession, LoginInput, RegisterInput, User } from '@domain/entities/auth';
import { appHttpClient } from '@infrastructure/http/http-client';

export class AuthApiRepository implements AuthRepository {
  async login(input: LoginInput): Promise<AuthSession> {
    const response = await appHttpClient.post<AuthSession>('/api/mock-auth/login', input);
    return response.data;
  }

  async register(input: RegisterInput): Promise<AuthSession> {
    const response = await appHttpClient.post<AuthSession>('/api/mock-auth/register', input);
    return response.data;
  }

  async getCurrentUser(): Promise<User> {
    const response = await appHttpClient.get<User>('/api/mock-auth/me');
    return response.data;
  }

  async logout(): Promise<void> {
    await appHttpClient.post('/api/mock-auth/logout');
  }
}
