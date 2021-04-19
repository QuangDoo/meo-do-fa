import { gql } from '@apollo/client';
import { ResponseMessage } from 'src/types/responses';

type CreateFeedbackInput = {
  orderId: number;
  guestName: string;
  guestPhone: string;
  type: number;
  note?: string;
  images: string[];
};

export type CreateFeedbackData = {
  createFeedback: ResponseMessage;
};
export type CreateFeedbackVars = {
  inputs: CreateFeedbackInput;
};
export const CREATE_FEEDBACK = gql`
  mutation createFeedback($inputs: CreateFeedbackInput!) {
    createFeedback(inputs: $inputs) {
      code
      status
      message
    }
  }
`;
