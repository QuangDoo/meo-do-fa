import { ApolloQueryResult } from '@apollo/client';
import { useTranslation } from 'i18n';
import React, { createContext, useContext } from 'react';
import { toast } from 'react-toastify';
import { GET_NOTI, GetNotiData, GetNotiVars } from 'src/graphql/notification/notify.query';
import { useQueryAuth } from 'src/hooks/useApolloHookAuth';

import { useToken } from './Token';

type ContextValue = {
  data: GetNotiData['getNotify'];
  loading: boolean;
  refetch: (variables?: Partial<GetNotiVars>) => Promise<ApolloQueryResult<GetNotiData>>;
};

const NotifyContext = createContext<ContextValue>(undefined);

const useNotify = () => useContext(NotifyContext);

function NotifyProvider(props) {
  const { t } = useTranslation(['errors']);

  const token = useToken();

  const { data, loading, refetch } = useQueryAuth<GetNotiData, GetNotiVars>(GET_NOTI, {
    variables: {
      page: 1,
      pageSize: 5
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    },
    onCompleted: () => {
      setTimeout(() => {
        refetch({
          page: 1,
          pageSize: 5
        });
      }, 600000);
    },
    skip: !token
  });

  return (
    <NotifyContext.Provider
      value={{
        data: data?.getNotify,
        loading,
        refetch
      }}>
      {props.children}
    </NotifyContext.Provider>
  );
}

export { useNotify, NotifyProvider };
