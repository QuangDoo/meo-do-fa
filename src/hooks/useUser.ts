import { useEffect } from 'react';
import { useUserContext } from 'src/contexts/User';
import { GET_USER, GetUserData } from 'src/graphql/user/getUser.mutation';

import { useLazyQueryAuth } from './useApolloHookAuth';
import useLocalStorage from './useLocalStorage';

export default function useUser() {
  const [getUser, { data, error }] = useLazyQueryAuth(GET_USER);

  const [token] = useLocalStorage('token');
  const { setUser } = useUserContext();

  useEffect(() => {
    if (!error) return;

    if (error?.graphQLErrors?.[0]?.extensions?.code === 500) {
      localStorage.removeItem('token');
    }
  }, [error]);

  useEffect(() => {
    if (!token) return;

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (data && setUser) {
      setUser(data);
    }
  }, [data]);

  return {
    getUser,
    user: data
  };
}
