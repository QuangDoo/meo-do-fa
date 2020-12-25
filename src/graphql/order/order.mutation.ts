import { gql } from '@apollo/client';

export const CREATE_COUNSEL = gql`
  mutation createCounsel($cartIds: [String]!) {
    createCounsel(inputs: { cartIds: $cartIds }) {
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
        totalPriceVat
        totalDcAmt
        totalShippingFee
        totalNetPrice
        totalDcPayment
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
            zipCode: $zipCode
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
