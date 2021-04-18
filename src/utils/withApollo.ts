import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { withApollo } from 'next-apollo';
import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const getURI = () => {
  console.log('SERVER...', JSON.stringify({ serverRuntimeConfig, publicRuntimeConfig }));
  console.log(
    `SERVER NEXT PUBLIC... NEXT_PUBLIC_GRAPHQL_GATEWAY: ${process.env.NEXT_PUBLIC_GRAPHQL_GATEWAY},  NEXT_PUBLIC_GRAPHQL_GATEWAY_EXT: ${process.env.NEXT_PUBLIC_GRAPHQL_GATEWAY_EXT} `
  );

  if (typeof window === 'undefined') {
    return `http://${
      serverRuntimeConfig.GRAPHQL_GATEWAY || process.env.NEXT_PUBLIC_GRAPHQL_GATEWAY
    }`;
  }
  return `https://${
    publicRuntimeConfig.GRAPHQL_GATEWAY_EXT || process.env.NEXT_PUBLIC_GRAPHQL_GATEWAY_EXT
  }`;
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
