import { gql } from 'apollo-boost'

export const GET_CATEGORIES = gql`
  query getAllCategories {
    getCategories {
      name
      slug
    }
  }
`
