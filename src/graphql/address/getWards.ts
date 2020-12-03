import { gql } from '@apollo/client';

export type Ward = {
  id: number;
  name: string;
};

export type GetWardsData = {
  getWards: Ward[];
};

export type GetWardsVars = {
  district_id: number;
};

export const GET_WARDS = gql`
  query getWards($district_id: Int!) {
    getWards(district_id: $district_id) {
      id
      name
      display_name
    }
  }
`;
