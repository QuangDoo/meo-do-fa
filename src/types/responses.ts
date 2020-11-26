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
export type GetPaymentAndDeliveryResponse = {
  paymentMethods: {
    id: number;
    name: string;
    display_name: string;
    account_name: string;
    account_no: string;
    bank_name: string;
    note: string;
  };
  deliveryMethods: {
    id: number;
    name: string;
    display_name: string;
    tax: string;
  };
};
export type CancelOrderResponse = {
  code: number;
  status: string;
  message: string;
};
