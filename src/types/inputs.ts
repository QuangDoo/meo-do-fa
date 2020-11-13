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

export type UpdateUserInput = {
  name: string;
  display_name: string;
  email: string;
  contact_address: string;
  company_name: string;
  vat: string;
  representative: string;
  business_license: string;
};
