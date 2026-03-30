import type { AuthSession, LoginInput, RegisterInput, User } from '@/src/domain/entities/auth';

export interface AuthRepository {
  login(input: LoginInput): Promise<AuthSession>;
  register(input: RegisterInput): Promise<AuthSession>;
  getCurrentUser(): Promise<User>;
  logout(): Promise<void>;
}
