import { gql } from '@apollo/client';

export type GetOrderDetailData = {
  getOrderDetail: {
    id: number;
    name: string;
    date_order: string;
    note: string;
    delivery_count: number;
    effective_date: string;
    expected_date: string;
    order_line: string[];
    partner_shipping_id: string[];
    state: string;
    partner_shipping: {
      name: string;
      street: string;
      city: string;
      email: string;
      phone: string;
    };
    order_lines: {
      id: number;
      name: string;
      product_uom_qty: number;
      price_tax: number;
      price_subtotal: number;
      price_unit: number;
      price_total: number;
      product: {
        name: string;
        list_price: number;
        slug: string;
        image_128: string;
      };
      state: string;
      product_type: string;
      list_price: number;
      active: boolean;
    }[];
    amount_total: number;
    amount_tax: number;
    amount_untaxed: number;
    flag: number;
  };
};

export type GetOrderDetailVars = {
  orderNo: string;
};

export const GET_ORDER_DETAIL = gql`
  query getOrderDetail($orderNo: String!) {
    getOrderDetail(orderNo: $orderNo) {
      id
      name
      date_order
      note
      delivery_count
      effective_date
      expected_date
      order_line
      partner_shipping_id
      state
      flag
      partner_shipping {
        name
        street
        city
        email
        phone
      }
      order_lines {
        id
        name
        product_uom_qty
        price_tax
        price_subtotal
        price_unit
        price_total
        product {
          name
          list_price
          slug
          image_128
        }
        state
        product_type
        list_price
        active
      }
      amount_total
      amount_tax
      amount_untaxed
      flag
    }
  }
`;
