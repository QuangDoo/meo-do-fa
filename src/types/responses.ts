export type LoginUserResponse = {
  token: string;
  status: string;
  code: number;
  message: string;
};

export type GetUserResponse = {
  id: string;
  display_name: string;
  email: string;
  phone: string;
  account_type: string;
  customer_rank: number;
  roles: string[];
  create_date: Date;
  update_date: Date;
  contact_address: string;
  company_name: string;
  vat: string;
  representative: string;
  business_license: string;
};
