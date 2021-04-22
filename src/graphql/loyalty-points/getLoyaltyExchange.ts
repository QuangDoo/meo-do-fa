import { gql } from '@apollo/client';

export type LoyaltyExchangeData = {
  getLoyaltyExchange: {
    id: number;
    name: string;
    point: number;
  }[];
};

export const GET_LOYALTY_EXCHANGE = gql`
  query {
    getLoyaltyExchange {
      id
      name
      point
    }
  }
`;
