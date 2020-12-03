import { useEffect } from 'react';
import { useUserContext } from 'src/contexts/User';
import { GET_USER, GetUserData } from 'src/graphql/user/getUser';

import { useLazyQueryAuth } from './useApolloHookAuth';
import useLocalStorage from './useLocalStorage';

export default function useUser() {
  const { setUser } = useUserContext();

  const [token, , removeToken] = useLocalStorage('token');

  const [getUser, { data }] = useLazyQueryAuth<GetUserData, undefined>(GET_USER, {
    onCompleted: (data) => {
      setUser(data.getUser);
    },
    onError: (error) => {
      if (error?.graphQLErrors?.[0]?.extensions?.code === 500) {
        removeToken();
      }
    }
  });

  useEffect(() => {
    if (!token || data !== undefined) return;

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return {
    getUser,
    user: data?.getUser
  };
}
