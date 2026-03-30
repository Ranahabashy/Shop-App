import type { ProductRepository } from '@/src/domain/repositories/product-repository';

export class GetProductDetailsUseCase {
  constructor(private readonly repository: ProductRepository) {}

  execute(id: number) {
    return this.repository.getProductById(id);
  }
}
