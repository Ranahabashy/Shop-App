import type { ProductRepository } from '@/src/domain/repositories/product-repository';
import type { ProductsQuery } from '@/src/domain/repositories/product-repository';

export class GetProductsUseCase {
  constructor(private readonly repository: ProductRepository) {}

  execute(query: ProductsQuery) {
    return this.repository.getProducts(query);
  }
}
