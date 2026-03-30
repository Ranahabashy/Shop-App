import type { RegisteredUser } from '@/src/domain/entities/auth';

const initialUsers: RegisteredUser[] = [
  {
    id: 'local-1',
    firstName: 'Demo',
    lastName: 'User',
    email: 'demo@solidshop.dev',
    username: 'demo',
    password: 'Demo@12345'
  }
];

const globalStore = globalThis as typeof globalThis & {
  __solidShopUsers?: RegisteredUser[];
};

if (!globalStore.__solidShopUsers) {
  globalStore.__solidShopUsers = initialUsers;
}

export function getUsersStore() {
  return globalStore.__solidShopUsers!;
}
