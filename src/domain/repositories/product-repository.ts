import type { Product, ProductsResponse } from '@/src/domain/entities/product';

export type ProductsQuery = {
  search?: string;
  category?: string;
  limit?: number;
  skip?: number;
};

export interface ProductRepository {
  getProducts(query: ProductsQuery): Promise<ProductsResponse>;
  getProductById(id: number): Promise<Product>;
  getCategories(): Promise<string[]>;
}
