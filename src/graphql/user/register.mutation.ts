import { gql } from 'apollo-boost'

export const REGISTER_USER = gql`
  mutation createUser(
    $phone: String!
    $name: String!
    $accountType: String!
    $password: String!
    $email: String!
  ) {
    createUser(
      inputs: {
        phone: $phone
        name: $name
        account_type: $accountType
        password: $password
        email: $email
      }
    ) {
      code
      status
      token
    }
  }
`
