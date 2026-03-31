import type {
  ProductRepository,
  ProductsQuery,
} from "@domain/repositories/product-repository";
import type {
  Product,
  ProductsResponse,
} from "@domain/entities/product";
import { appHttpClient } from "@infrastructure/http/http-client";

export class ProductApiRepository implements ProductRepository {
  async getProducts(query: ProductsQuery): Promise<ProductsResponse> {
    const response = await appHttpClient.get<ProductsResponse>("/api/products", {
      params: query,
    });

    return response.data;
  }

  async getProductById(id: number): Promise<Product> {
    const response = await appHttpClient.get<Product>(`/api/products/${id}`);
    return response.data;
  }

  async getCategories(): Promise<string[]> {
    const response = await appHttpClient.get<string[]>("/api/products/categories");
    return response.data;
  }
}