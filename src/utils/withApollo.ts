import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { withApollo } from 'next-apollo';
const httpLink = new HttpLink({
  uri: 'https://graphql.medofa.bedigital.vn/graphql'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = global?.localStorage?.getItem('token');
  console.log(token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || ''
    }
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const apolloClient = new ApolloClient({
  ssrMode: true,
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache()
});

export default withApollo(apolloClient);
