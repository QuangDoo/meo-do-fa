import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { withApollo } from 'next-apollo';
// https://graphql.medofa.bedigital.vn/graphql/
const httpLink = createHttpLink({
  uri: 'http://192.168.1.12:3901/graphql/'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || ''
    }
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default withApollo(apolloClient);
