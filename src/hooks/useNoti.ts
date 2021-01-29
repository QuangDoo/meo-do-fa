import { useTranslation } from 'i18n';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { GET_NOTI, GetNotiData, GetNotiVars } from 'src/graphql/notification/notify.query';

import { useQueryAuth } from './useApolloHookAuth';

type Notify = {
  page: number;
  pageSize: number;
};

export default function useNoti(props: Notify) {
  const { t } = useTranslation('errors');

  const { data, error, loading, refetch } = useQueryAuth<GetNotiData, GetNotiVars>(GET_NOTI, {
    variables: { page: props?.page, pageSize: props?.pageSize },
    fetchPolicy: 'network-only',
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  useEffect(() => {
    if (!data?.getNotify.Notifies) return null;

    refetch();
  }, [data?.getNotify.Notifies, refetch]);

  return {
    notifications: data?.getNotify,
    error,
    loading,
    refetchNoti: refetch
  };
}
