import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { i18n } from 'i18n';
import { withApollo } from 'next-apollo';

const getURI = () => {
  if (typeof window === 'undefined') {
    return `http://${process.env.GRAPHQL_GATEWAY}`;
  }

  return `https://${process.env.NEXT_PUBLIC_GRAPHQL_GATEWAY_EXT}`;
};

const httpLink = new HttpLink({
  uri: getURI(),
  headers: {
    'x-language': i18n.language
  }
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
