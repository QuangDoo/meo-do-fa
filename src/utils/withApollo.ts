import { withApollo } from 'next-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'

const apolloClient = new ApolloClient({
  uri: 'https://odoo.medofa.bedigital.vn/web',
  cache: new InMemoryCache(),
})

export default withApollo(apolloClient)
