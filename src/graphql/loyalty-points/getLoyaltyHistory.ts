import { gql } from '@apollo/client';

enum LoyaltyPoint {
  MANUAL = 'manual',
  EXCHANGE = 'exchange',
  AUTO = 'auto'
}

export type LoyaltyHistoryType = {
  type: LoyaltyPoint;
  quantity: number;
  partner_id: number;
  description: string;
  create_date: Date;
};

export const GET_LOYALTY_HISTORY = gql`
  query {
    getLoyaltyHistory {
      type
      quantity
      partner_id
      description
      create_date
    }
  }
`;
