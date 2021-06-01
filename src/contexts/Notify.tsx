import { ApolloQueryResult, QueryLazyOptions, ServerError, useLazyQuery } from '@apollo/client';
import { useTranslation } from 'i18n';
import cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { GET_NOTI, GetNotiData, GetNotiVars } from 'src/graphql/notification/notify.query';
type ContextValue = {
  data: GetNotiData['getNotify'];
  loading: boolean;
  refetch: (variables?: Partial<GetNotiVars>) => Promise<ApolloQueryResult<GetNotiData>>;
  getNotify: (options?: QueryLazyOptions<undefined>) => void;
};

const NotifyContext = createContext<ContextValue>(undefined);

const useNotify = () => useContext(NotifyContext);

function NotifyProvider(props) {
  const { t } = useTranslation(['errors']);

  const router = useRouter();

  // Lazy query
  const [fetch, { data, loading, refetch }] = useLazyQuery<GetNotiData, GetNotiVars>(GET_NOTI, {
    variables: {
      page: 1,
      pageSize: 5
    },
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
    },
    onCompleted: () => {
      setTimeout(() => {
        refetch({
          page: 1,
          pageSize: 5
        });
      }, 600000);
    }
  });

  // Get notify with token in cookies
  const getNotify = () => {
    fetch({
      context: {
        headers: {
          authorization: cookies.get('token') || ''
        }
      }
    });
  };

  // Get notify on mount if has token in cookies
  useEffect(() => {
    const token = cookies.get('token');

    if (!token) return;

    getNotify();
  }, []);

  return (
    <NotifyContext.Provider
      value={{
        data: data?.getNotify,
        loading,
        refetch,
        getNotify
      }}>
      {props.children}
    </NotifyContext.Provider>
  );
}

export { useNotify, NotifyProvider };
