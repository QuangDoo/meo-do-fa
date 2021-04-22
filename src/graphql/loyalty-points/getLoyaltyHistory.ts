import { gql } from '@apollo/client';

export enum LoyaltyType {
  MANUAL = 'manual',
  EXCHANGE = 'exchange',
  AUTO = 'auto'
}

export type LoyaltyHistoryType = {
  type: LoyaltyType;
  quantity: number;
  partner_id: number;
  description: string;
  create_date: Date;
  loyalty_point_sum: number;
};

export type LoyaltyHistoryData = {
  getLoyaltyHistory: LoyaltyHistoryType[];
};

export const GET_LOYALTY_HISTORY = gql`
  query {
    getLoyaltyHistory {
      type
      quantity
      partner_id
      description
      create_date
      loyalty_point_sum
    }
  }
`;
