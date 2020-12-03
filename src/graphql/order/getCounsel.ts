import { gql } from '@apollo/client';

export type CounselDetail = {
  cartId: string;
  productId: number;
  quantity: number;
  productName: string;
};

export type Counsel = {
  _id: string;
  userId: number;
  orderNo: string;
  counsels: CounselDetail[];
  create_date: Date;
};

export type GetCounselData = {
  getCounsel: {
    counsel: Counsel;
    totalQty: number;
    totalPrice: number;
    totalDcAmt: number;
    totalShippingFee: number;
    totalNetPrice: number;
  };
};

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
