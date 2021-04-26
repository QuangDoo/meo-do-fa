import { gql } from '@apollo/client';

export type LoyaltyExchangeData = {
  code: number;
  status: string;
  message: string;
};

export type LoyaltyExchangeVars = {
  exchangeId: number;
};

export const CREATE_LOYALTY_EXCHANGE = gql`
  mutation createLoyaltyExchange($exchangeId: Int!) {
    createLoyaltyExchange(exchangeId: $exchangeId) {
      code
      status
      message
    }
  }
`;
