import type { ProductRepository } from '@domain/repositories/product-repository';

export class GetCategoriesUseCase {
  constructor(private readonly repository: ProductRepository) {}

  execute() {
    return this.repository.getCategories();
  }
}
