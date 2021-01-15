import { gql } from '@apollo/client';

export type Pathology = {
  id: number;
  name: string;
  description: string;
};

export type GetPathologiesData = {
  getPathologies: Pathology[];
};

export const GET_PATHOLOGIES = gql`
  query {
    getPathologies {
      id
      name
      description
    }
  }
`;
