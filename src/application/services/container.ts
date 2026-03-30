import { AuthApiRepository } from '@/src/infrastructure/repositories/auth-api-repository';
import { ProductApiRepository } from '@/src/infrastructure/repositories/product-api-repository';
import { GetCategoriesUseCase } from '@/src/application/use-cases/get-categories';
import { GetCurrentUserUseCase } from '@/src/application/use-cases/get-current-user';
import { GetProductDetailsUseCase } from '@/src/application/use-cases/get-product-details';
import { GetProductsUseCase } from '@/src/application/use-cases/get-products';
import { LoginUserUseCase } from '@/src/application/use-cases/login-user';
import { LogoutUserUseCase } from '@/src/application/use-cases/logout-user';
import { RegisterUserUseCase } from '@/src/application/use-cases/register-user';

const productRepository = new ProductApiRepository();
const authRepository = new AuthApiRepository();

export const serviceContainer = {
  getProducts: new GetProductsUseCase(productRepository),
  getProductDetails: new GetProductDetailsUseCase(productRepository),
  getCategories: new GetCategoriesUseCase(productRepository),
  loginUser: new LoginUserUseCase(authRepository),
  registerUser: new RegisterUserUseCase(authRepository),
  getCurrentUser: new GetCurrentUserUseCase(authRepository),
  logoutUser: new LogoutUserUseCase(authRepository)
};
