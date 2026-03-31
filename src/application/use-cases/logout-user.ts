import type { AuthRepository } from '@domain/repositories/auth-repository';

export class LogoutUserUseCase {
  constructor(private readonly repository: AuthRepository) {}

  execute() {
    return this.repository.logout();
  }
}
