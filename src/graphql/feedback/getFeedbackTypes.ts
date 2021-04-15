import { gql } from '@apollo/client';

type FeedbackTypes = {
  id: number;
  name: string;
  info: string;
  code: string;
};

export type GetFeedbackTypesData = {
  getFeedbackTypes: FeedbackTypes[];
};

export const GET_FEEDBACK_TYPES = gql`
  query {
    getFeedbackTypes {
      id
      name
      info
      code
    }
  }
`;
