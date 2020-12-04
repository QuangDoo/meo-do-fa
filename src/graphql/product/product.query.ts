import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query getProducts(
    $page: Int!
    $pageSize: Int!
    $order_type: String!
    $type: String
    $category_id: String
    $manufacturer_id: String
    $name: String
  ) {
    getProductByConditions(
      page: $page
      pageSize: $pageSize
      type: $type
      condition: {
        order_type: $order_type
        category_id: $category_id
        manufacturer_id: $manufacturer_id
        name: $name
      }
    ) {
      Products {
        id
        name
        price
        list_price
        standard_price
        image_128
        image_512
        image_256
        uom_name
        is_new
        is_quick_invoice
        is_vn
        is_exclusive
        slug
        categories {
          id
          name
        }
        manufacturer {
          id
          name
        }
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
      display_name
      price
      list_price
      standard_price
      active
      pricelist_item_count
      description
      description_purchase
      description_sale
      total_sale
      currency_id
      is_primary
      is_new
      is_exclusive
      is_vn
      is_drop_ship
      is_quick_invoice
      vat
      info
      indication
      contraindication
      direction
      interaction
      preservation
      overdose
      pharmacodynamics
      pharmacokinetics
      sale_ok
      purchase_ok
      create_date
      image_128
      image_512
      image_256
      category_ids
      uom_name
      categories {
        id
        name
        complete_name
        parent_id
        parent_path
        create_date
      }
      ingredients {
        id
        name
        display_name
        amount
      }
      manufacturer {
        id
        name
        display_name
        location
        short_name
        slug
        top_rated

        create_date
      }

      badges
    }
  }
`;
