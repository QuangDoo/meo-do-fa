import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { withApollo } from 'next-apollo';

const apolloClient = new ApolloClient({
  uri: 'http://192.168.1.14:3906',
  cache: new InMemoryCache()
});

export default withApollo(apolloClient);
