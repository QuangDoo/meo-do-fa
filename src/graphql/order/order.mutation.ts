import { gql } from '@apollo/client';

export const ADD_TO_CART = gql`
  mutation createCart(
    $productId: Int!
    $quantity: Int!
    $price: Float!
    $productName: String!
    $oldPrice: Float
    $promotionIds: [String]
    $dcAmt: Float
  ) {
    createCart(
      inputs: {
        productId: $productId
        quantity: $quantity
        price: $price
        productName: $productName
        oldPrice: $oldPrice
        promotionIds: $promotionIds
        dcAmt: $dcAmt
      }
    ) {
      code
      status
      message
    }
  }
`;
export const CREATE_COUNSEL = gql`
  mutation createCounsel($cardIds: [String]!) {
    createCounsel(inputs: { cartIds: $cardIds }) {
      code
      status
      message
      data {
        counsel {
          orderNo
          counsels {
            cartId
            quantity
          }
        }
        totalQty
        totalPrice
        totalDcAmt
        totalShippingFee
        totalNetPrice
      }
    }
  }
`;
export const CREATE_ORDER = gql`
  mutation createOrder(
    $orderNo: String!
    $partnerId: String!
    $zipCode: Int!
    $city: String!
    $district: String!
    $ward: String!
    $street: String!
    $isNew: Boolean!
    $use: Boolean!
    $fullName: String!
    $phone: String!
    $email: String!
    $paymentMethodId: Int!
    $deliveryMethodId: Int!
    $note: String!
    $isInvoice: Boolean!
  ) {
    createOrder(
      inputs: {
        orderNo: $orderNo
        customer: {
          billing_address: {
            partnerId: $partnerId
            isNew: $isNew
            use: $use
            zipCode: $zipCode
            city: $city
            district: $district
            ward: $ward
            street: $street
          }
          fullName: $fullName
          phone: $phone
          shipping_address: {
            partnerId: $partnerId
            isNew: $isNew
            use: $use
            city: $city
            district: $district
            ward: $ward
            street: $street
            zipcode: $zipcode
          }
          email: $email
        }
        paymentMethodId: $paymentMethodId
        deliveryMethodId: $deliveryMethodId
        note: $note
        isInvoice: $isInvoice
      }
    ) {
      status
      message
      orderNo
      orderId
    }
  }
`;
