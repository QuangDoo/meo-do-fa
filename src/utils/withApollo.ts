import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { withApollo } from 'next-apollo';

const apolloClient = new ApolloClient({
  uri: 'https://graphql.medofa.bedigital.vn',
  cache: new InMemoryCache()
});

export default withApollo(apolloClient);
