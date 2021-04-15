import { gql } from '@apollo/client';
import { ResponseMessage } from 'src/types/responses';

export type FeedbackInput = {
  orderNo: string;
  guessName: string;
  guessPhone: string;
  type: string;
  note?: string;
  images: string[];
};

export type CreateFeedbackData = {
  createFeedback: ResponseMessage;
};
export type CreateFeedbackVar = {
  inputs: FeedbackInput;
};
export const CREATE_FEEDBACK = gql`
  mutation createFeedback($inputs: FeedbackInput) {
    createFeedback(inputs: $inputs) {
      code
      status
      message
    }
  }
`;
