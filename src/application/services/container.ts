import { AuthApiRepository } from '@infrastructure/repositories/auth-api-repository';
import { ProductApiRepository } from '@infrastructure/repositories/product-api-repository';
import { GetCategoriesUseCase } from '@usecases/get-categories';
import { GetCurrentUserUseCase } from '@usecases/get-current-user';
import { GetProductDetailsUseCase } from '@usecases/get-product-details';
import { GetProductsUseCase } from '@usecases/get-products';
import { LoginUserUseCase } from '@usecases/login-user';
import { LogoutUserUseCase } from '@usecases/logout-user';
import { RegisterUserUseCase } from '@usecases/register-user';

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
