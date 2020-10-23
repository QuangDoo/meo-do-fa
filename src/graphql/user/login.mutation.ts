import { gql } from 'apollo-boost'

export const LOGIN_USER = gql`
  mutation login($phone: String!, $password: String!) {
    login(inputs: { phone: $phone, password: $password }) {
      token
      code
      status
    }
  }
`
