export type CreateUserInput = {
  phone: string;
  name: string;
  account_type: string;
  password: string;
  email: string;
};

export type LoginUserInput = {
  phone: string;
  password: string;
};
