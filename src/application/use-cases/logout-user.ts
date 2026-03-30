import type { AuthRepository } from '@/src/domain/repositories/auth-repository';

export class LogoutUserUseCase {
  constructor(private readonly repository: AuthRepository) {}

  execute() {
    return this.repository.logout();
  }
}
