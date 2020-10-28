import { gql } from 'apollo-boost'

export const GET_PRODUCTS = gql`
  query getAllProduct($page: Int!, $pageSize: Int!) {
    getProducts(page: $page, pageSize: $pageSize) {
      id
      name
      list_price
      sequence
      color
      description
      description_purchase
      description_sale
      type
      active
      rental
      sale_ok
      purchase_ok
      volume
      weight
      create_date
      image_128
      image_512
      image_256
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
