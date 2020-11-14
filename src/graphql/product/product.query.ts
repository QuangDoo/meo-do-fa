import { gql } from 'apollo-boost';

export const GET_PRODUCTS = gql`
  query getProducts(
    $page: Int!
    $pageSize: Int!
    $order_type: String!
    $type: String
    $category_id: String
    $manufacturer_id: String
  ) {
    getProductByConditions(
      page: $page
      pageSize: $pageSize
      type: $type
      condition: {
        order_type: $order_type
        category_id: $category_id
        manufacturer_id: $manufacturer_id
      }
    ) {
      Products {
        id
        name
        list_price
        standard_price
        color
        description
        description_purchase
        description_sale
        active
        sale_ok
        purchase_ok
        volume
        weight
        create_date
        image_128
        image_512
        image_256
        category_ids
        uom_name
      }
      total
    }
  }
`;
export const GET_PRODUCT = gql`
  query getProduct($id: Int!) {
    getProduct(id: $id) {
      id
      name
      list_price
      sequence
      color
      description
      description_purchase
      description_sale
      categ_id
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
`;
export const GET_PRODUCTS_DEAL = gql`
query getProductsDeal($page: Int!, $pageSize: Int!) {
  getProducts(page: $page, pageSize: $pageSize) {
    id
    name
    list_price
    standard_price
    color
    description
    description_purchase
    description_sale
    active
    sale_ok
    purchase_ok
    volume
    weight
    create_date
    image_128
    image_512
    image_256
    category_ids
    uom_name
      }
    }
  }
`;
