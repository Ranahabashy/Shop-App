import type { AuthRepository } from '@domain/repositories/auth-repository';
import type { RegisterInput } from '@domain/entities/auth';

export class RegisterUserUseCase {
  constructor(private readonly repository: AuthRepository) {}

  execute(input: RegisterInput) {
    return this.repository.register(input);
  }
}
