import { gql } from 'apollo-boost'

export const GET_PRODUCTS = gql`
  query getAllProduct($input: GetAllProductInput!) {
    getAllProduct(input: $input) {
      data {
        id
        sku
        name
        price
        finalPrice
        promotionPercent
        namePath
        image
      }
    }
  }
`

export const GET_PRODUCTS_LAB = gql`
  query getProducts($page: Int!, $limit: Int!) {
    getProducts(page: $page, limit: $limit) {
      name
      categories {
        name
        slug
      }
      slug
      price
    }
  }
`
