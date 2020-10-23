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
export const GET_PRODUCT = gql`
  query getProduct($id: String!) {
    getProduct(id: $id) {
      id
      name
      categories
      list_price
      sequence
      categ_id
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
      uom_id
      uom_po_id
      create_date
    }
  }
`
