import { gql } from '@apollo/client';

export type GetCartData = {
  getCart: {
    carts: {
      _id: string;
      quantity: number;
      productId: string;
      productName: string;
      price: number;
      list_price: number;
      oldPrice: number;
      product: {
        image_512: string;
      };
    }[];
    totalPrice: number;
    totalQty: number;
  };
};

export type GetOrderDetail = {
  getOrderDetail: {
    id: number;
    name: string;
    date_order: string;
    note: string;
    delivery_count: number;
    effective_date: string;
    expected_date: string;
    order_line: string[];
    payment_method: string[];
    partner_shipping_id: string[];
    order_lines: {
      id: number;
      name: string;
      price_tax: number;
      price_subtotal: number;
      price_unit: number;
      price_total: number;
      product: {
        name: string;
        list_price: number;
      };
    };
  }[];
};

export type GetOrderDetailVar = {
  id: number;
};

export const GET_CART = gql`
  query {
    getCart {
      carts {
        _id
        quantity
        productId
        productName
        price
        oldPrice
        product {
          image_512
        }
      }
      totalPrice
      totalQty
    }
  }
`;
export const GET_COUNSEL = gql`
  query {
    getCounsel {
      counsel {
        _id
        userId
        orderNo
        counsels {
          cartId
          productId
          quantity
          productName
        }
        create_date
      }
      totalQty
      totalPrice
      totalDcAmt
      totalShippingFee
      totalNetPrice
    }
  }
`;

export const GET_ORDER = gql`
  query getOrderDetail($id: Int!) {
    getOrderDetail(id: $id) {
      id
      name
      date_order
      note
      delivery_count
      effective_date
      expected_date
      order_line
      partner_shipping_id
      order_lines {
        id
        name
        price_tax
        price_subtotal
        price_unit
        price_tax
        price_total
        product {
          name
          list_price
        }
        state
      }
    }
  }
`;
