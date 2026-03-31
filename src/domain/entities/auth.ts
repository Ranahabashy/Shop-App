export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type RegisteredUser = User & {
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type AuthSession = {
  accessToken: string;
  user: User;
};
