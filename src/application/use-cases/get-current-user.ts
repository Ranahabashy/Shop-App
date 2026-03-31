import type { AuthRepository } from '@domain/repositories/auth-repository';

export class GetCurrentUserUseCase {
  constructor(private readonly repository: AuthRepository) {}

  execute() {
    return this.repository.getCurrentUser();
  }
}
