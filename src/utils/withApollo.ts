import { withApollo } from 'next-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'

const apolloClient = new ApolloClient({
  uri: 'https://graphql.medofa.bedigital.vn/',
  cache: new InMemoryCache(),
})

export default withApollo(apolloClient)
