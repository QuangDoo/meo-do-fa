import { gql } from '@apollo/client';
import { SaveMailSubscriber } from 'src/types/inputs';
import { ResponseMessage } from 'src/types/responses';

export type SubscriberData = {
  saveMailSubscriber: ResponseMessage;
};
export type SubscriberVar = {
  inputs: SaveMailSubscriber;
};
export const SAVE_MAIL_SUBSCRIBE = gql`
  mutation saveMailSubscriber($inputs: SaveMailSubscriber) {
    saveMailSubscriber(inputs: $inputs) {
      code
      status
      message
    }
  }
`;
