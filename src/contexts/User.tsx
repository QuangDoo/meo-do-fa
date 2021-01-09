import { ApolloQueryResult } from '@apollo/client';
import { useTranslation } from 'i18n';
import cookies from 'js-cookie';
import React, { createContext, useContext } from 'react';
import { toast } from 'react-toastify';
import { GET_USER, GetUserData, User } from 'src/graphql/user/getUser';
import { useQueryAuth } from 'src/hooks/useApolloHookAuth';

import { useToken } from './Token';

type UserSSRContextValue = {
  data: User;
  loading: boolean;
  refetch: (variables?: undefined) => Promise<ApolloQueryResult<GetUserData>>;
};

const UserContext = createContext<UserSSRContextValue>(undefined);

const useUser = () => useContext(UserContext);

function UserProvider(props) {
  const token = useToken();

  const { t } = useTranslation(['errors']);

  const { data, loading, refetch } = useQueryAuth<GetUserData, undefined>(GET_USER, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      const errorCode = error.graphQLErrors?.[0]?.extensions?.code;

      const isClient = typeof window !== 'undefined';

      if (isClient) {
        if (errorCode === 500) {
          cookies.remove('token');
        }
        toast.error(t(`errors:code_${errorCode}`));
      }
    },
    skip: !token
  });

  return (
    <UserContext.Provider
      value={{
        data: data?.getUser,
        loading,
        refetch
      }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { useUser, UserProvider };
