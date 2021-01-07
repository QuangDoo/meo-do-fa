import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useUserContext } from 'src/contexts/User';
import { GET_USER, GetUserData } from 'src/graphql/user/getUser';

import { useLazyQueryAuth } from './useApolloHookAuth';

type Props = {
  onCompleted?: (data: GetUserData) => void;
};

export default function useUser(props: Props = {}) {
  const { user, setUser } = useUserContext();

  const token = decodeURIComponent(Cookies.get('token') || '');

  const [getUser, { data, loading, refetch: refetchUser }] = useLazyQueryAuth<
    GetUserData,
    undefined
  >(GET_USER, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setUser(data.getUser);
      props.onCompleted?.(data);
    },
    onError: (error) => {
      if (error?.graphQLErrors?.[0]?.extensions?.code === 500) {
        Cookies.remove('token');
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
    getUser,
    refetchUser
  };
}
