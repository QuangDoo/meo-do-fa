import { withApollo } from 'next-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3906/graphql',
  cache: new InMemoryCache(),
})

export default withApollo(apolloClient)
