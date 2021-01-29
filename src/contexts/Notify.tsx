import { ApolloQueryResult, QueryLazyOptions } from '@apollo/client';
import { useTranslation } from 'i18n';
import cookies from 'js-cookie';
import React, { createContext, useContext } from 'react';
import { toast } from 'react-toastify';
import {
  GET_NOTI,
  GetNotiData,
  GetNotiVars,
  Notifies
} from 'src/graphql/notification/notify.query';
import { useLazyQueryAuth } from 'src/hooks/useApolloHookAuth';

import { useToken } from './Token';

type NotifySSRContextValue = {
  getNotify: (options?: QueryLazyOptions<GetNotiVars>) => void;
  data: Notifies[];
  total: number;
  totalUnseen: number;
  loading: boolean;
  refetch: () => Promise<ApolloQueryResult<GetNotiData>>;
};

const NotifyContext = createContext<NotifySSRContextValue>(undefined);

const useNotify = () => useContext(NotifyContext);

function NotifyProvider(props) {
  const { t } = useTranslation(['errors']);

  const [getNotify, { data, loading, refetch }] = useLazyQueryAuth<GetNotiData, GetNotiVars>(
    GET_NOTI,
    {
      fetchPolicy: 'network-only',
      onError: (error) => {
        const errorCode = error.graphQLErrors?.[0]?.extensions?.code;

        toast.error(t(`errors:code_${errorCode}`));
      }
    }
  );

  return (
    <NotifyContext.Provider
      value={{
        getNotify,
        data: data?.getNotify?.Notifies,
        total: data?.getNotify?.total,
        totalUnseen: data?.getNotify?.totalUnseen,
        loading,
        refetch
      }}>
      {props.children}
    </NotifyContext.Provider>
  );
}

export { useNotify, NotifyProvider };
