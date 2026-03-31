import type { ProductRepository } from '@domain/repositories/product-repository';
import type { ProductsQuery } from '@domain/repositories/product-repository';

export class GetProductsUseCase {
  constructor(private readonly repository: ProductRepository) {}

  execute(query: ProductsQuery) {
    return this.repository.getProducts(query);
  }
}
