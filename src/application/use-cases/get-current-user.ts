import type { AuthRepository } from '@/src/domain/repositories/auth-repository';

export class GetCurrentUserUseCase {
  constructor(private readonly repository: AuthRepository) {}

  execute() {
    return this.repository.getCurrentUser();
  }
}
