import { gql } from 'apollo-boost';

export const GET_MANUFACTURERS = gql`
  query {
    getManufactoriesAll {
      id
      name
      display_name
      location
      short_name
      slug
      top_rated
      product_ids
      create_date
    }
  }
`;