import { gql } from 'apollo-boost'

export const GET_PRODUCTS = gql`
  query getAllProduct($page: Int!, $pageSize: Int!) {
    getProducts(page: $page, pageSize: $pageSize) {
      id
      name
    }
  }
`

// export const GET_PRODUCTS = gql`
//   query getAllProduct($input: GetAllProductInput!) {
//     getProducts(input: $input) {
//       data {
//         id
//         sku
//         name
//         price
//         finalPrice
//         promotionPercent
//         namePath
//         image
//       }
//     }
//   }
// `
