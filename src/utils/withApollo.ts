import { withApollo } from 'next-apollo'
import ApolloClient, { InMemoryCache } from 'apollo-boost'

const apolloClient = new ApolloClient({
  uri: 'http://192.168.1.11:3906/',
  cache: new InMemoryCache(),
})

export default withApollo(apolloClient)
