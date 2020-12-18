import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { withApollo } from 'next-apollo';

const getURI = () => {
  if (typeof window === 'undefined') {
    console.log('SERVER...');

    return 'http://gateway.medofa.svc.cluster.local/graphql';
  }

  return 'https://graphql.medofa.com';
};

const httpLink = new HttpLink({
  uri: getURI()
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ locations, path, extensions }) => {
      console.log(
        `=========⚠️ [GraphQL error] ========\n
- Code: ${extensions.code} \n
- Location: ${locations} \n
- Path: ${path} \n
===================================\n
      `.trim()
      );
    });

  if (networkError) {
    console.log(`⚠️ [Network error]: ${networkError}`);
  }
});

const apolloClient = new ApolloClient({
  ssrMode: true,
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache()
});

export default withApollo(apolloClient);
