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
`;
// query getAllProduct($page: Int!, $pageSize: Int!) {
//   getProducts(page: $page, pageSize: $pageSize) {
//     id
//     name
//     display_name
//     price
//     list_price
//     lst_price
//     standard_price
//     code
//     partner_ref
//     active
//     color
//     product_tmpl_id
//     volume
//     weight
//     pricelist_item_count
//     description
//     description_purchase
//     description_sale
//     total_sale
//     currency_id
//     is_primary
//     is_new
//     is_exclusive
//     is_vn
//     is_drop_ship
//     is_quick_invoice
//     vat
//     info
//     indication
//     contraindication
//     direction
//     interaction
//     preservation
//     overdose
//     pharmacodynamics
//     pharmacokinetics
//     sale_ok
//     purchase_ok
//     create_date
//     image_128
//     image_512
//     image_256
//     image_1920
//     image_1024
//     category_ids
//     uom_name
//     categories {
//       id
//       display_name
//     }

//     ingredients {
//       id
//       display_name
//     }
//     ingredient_ids
//   }
export const GET_PRODUCT = gql`
  query getProduct($id: Int!) {
    getProduct(id: $id) {
      id
      name
      display_name
      price
      list_price
      lst_price
      standard_price
      code
      partner_ref
      active
      color
      product_tmpl_id
      volume
      weight
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
      category_ids
      uom_name
      categories {
        id
        display_name
      }
      ingredients {
        id
        display_name
      }
      manufacturer_id
      ingredient_ids
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
`;
