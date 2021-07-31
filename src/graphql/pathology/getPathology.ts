import { gql } from '@apollo/client';

import { Pathology } from './getPathologies';

export type GetPathologyVars = {
  id: number;
};

export type GetPathologyData = {
  getPathology: Pathology;
};

export const GET_PATHOLOGY = gql`
  query($id: Int!) {
    getPathology(id: $id) {
      id
      name
      description
    }
  }
`;
