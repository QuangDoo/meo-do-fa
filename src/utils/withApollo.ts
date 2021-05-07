import { ApolloClient, DefaultOptions, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { withApollo } from 'next-apollo';
import getConfig from 'next/config';
import fetch from 'node-fetch';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const getURI = () => {
  console.log('SERVER...', JSON.stringify({ serverRuntimeConfig, publicRuntimeConfig }));
  console.log(
    `SERVER NEXT PUBLIC... NEXT_PUBLIC_GRAPHQL_GATEWAY: ${process.env.NEXT_PUBLIC_GRAPHQL_GATEWAY},  NEXT_PUBLIC_GRAPHQL_GATEWAY_EXT: ${process.env.NEXT_PUBLIC_GRAPHQL_GATEWAY_EXT} `
  );

  // if (typeof window === 'undefined') {
  //   return `http://${
  //     serverRuntimeConfig.GRAPHQL_GATEWAY || process.env.NEXT_PUBLIC_GRAPHQL_GATEWAY
  //   }`;
  // }
  // return `https://${
  //   publicRuntimeConfig.GRAPHQL_GATEWAY_EXT || process.env.NEXT_PUBLIC_GRAPHQL_GATEWAY_EXT
  // }`;

  return `http://${serverRuntimeConfig.GRAPHQL_GATEWAY || process.env.NEXT_PUBLIC_GRAPHQL_GATEWAY}`;
};

const httpLink = new HttpLink({
  fetch: fetch as any,
  uri: getURI(),
  fetchOptions: {
    timeout: 5000
  }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.log(
        `=========⚠️ [GraphQL error] ========\n
- Code: ${extensions.code} \n
- Location: ${locations} \n
- Path: ${path} \n
- Message: ${message} \n
===================================\n
      `.trim()
      );
    });

  if (networkError) {
    console.log(`⚠️ [Network error]: ${networkError}`);
  }
});

const defaultOptions: DefaultOptions = {
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  }
};

const apolloClient = new ApolloClient({
  ssrMode: true,
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions
});

export default withApollo(apolloClient);
