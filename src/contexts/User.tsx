import { ApolloQueryResult, QueryLazyOptions, ServerError, useLazyQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { GET_USER, GetUserData } from 'src/graphql/user/getUser';

type UserSSRContextValue = {
  data: GetUserData['getUser'];
  loading: boolean;
  refetch: () => Promise<ApolloQueryResult<GetUserData>>;
  getUser: (options?: QueryLazyOptions<undefined>) => void;
};

const UserContext = createContext<UserSSRContextValue>(undefined);

const useUser = () => useContext(UserContext);

function UserProvider(props) {
  const { t } = useTranslation(['errors']);

  const router = useRouter();

  // Lazy query
  const [fetch, { data, loading, refetch }] = useLazyQuery<GetUserData, undefined>(GET_USER, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      if ((error.networkError as ServerError).statusCode === 401) {
        cookies.remove('token');
        router.reload();
        router.push('/');
        return;
      }

      const errorCode = error.graphQLErrors?.[0]?.extensions?.code;

      if ([500, 107].includes(errorCode)) {
        cookies.remove('token');
        router.reload();
        router.push('/');
      }

      toast.error(t(`errors:code_${errorCode}`));
    }
  });

  // Get user with token in cookies
  const getUser = () => {
    fetch({
      context: {
        headers: {
          authorization: cookies.get('token') || ''
        }
      }
    });
  };

  // Get user on mount if has token in cookies
  useEffect(() => {
    const token = cookies.get('token');

    if (!token) return;

    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        data: data?.getUser,
        loading,
        refetch,
        getUser
      }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { useUser, UserProvider };
