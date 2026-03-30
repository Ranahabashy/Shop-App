import type { AuthRepository } from '@/src/domain/repositories/auth-repository';
import type { RegisterInput } from '@/src/domain/entities/auth';

export class RegisterUserUseCase {
  constructor(private readonly repository: AuthRepository) {}

  execute(input: RegisterInput) {
    return this.repository.register(input);
  }
}
