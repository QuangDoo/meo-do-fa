import { useEffect } from 'react';
import { useUserContext } from 'src/contexts/User';
import { GET_USER, GetUserData, User } from 'src/graphql/user/getUser';

import { useLazyQueryAuth } from './useApolloHookAuth';
import useLocalStorage from './useLocalStorage';

type Props = {
  onCompleted?: (data: GetUserData) => void;
};

export default function useUser(props: Props = {}) {
  const { user, setUser } = useUserContext();

  const [token, , removeToken] = useLocalStorage('token');

  const [getUser, { data, loading }] = useLazyQueryAuth<GetUserData, undefined>(GET_USER, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setUser(data.getUser);
      props.onCompleted?.(data);
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
    user,
    loading,
    getUser
  };
}
