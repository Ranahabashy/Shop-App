import type { AuthRepository } from '@domain/repositories/auth-repository';
import type { LoginInput } from '@domain/entities/auth';

export class LoginUserUseCase {
  constructor(private readonly repository: AuthRepository) {}

  execute(input: LoginInput) {
    return this.repository.login(input);
  }
}
