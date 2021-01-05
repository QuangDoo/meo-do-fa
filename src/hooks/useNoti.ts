import { useEffect } from 'react';
import { GET_NOTI, GetNotiData, GetNotiVars } from 'src/graphql/notification/notify.query';

import { useQueryAuth } from './useApolloHookAuth';

type Notify = {
  page: number;
  pageSize: number;
};

export default function useNoti(props: Notify) {
  const { data, error, loading, refetch } = useQueryAuth<GetNotiData, GetNotiVars>(GET_NOTI, {
    variables: { page: props?.page, pageSize: props?.pageSize }
  });

  useEffect(() => {
    if (!data) return;
    const interval_obj = setInterval(() => {
      refetch();
    }, 5000);
    return () => clearInterval(interval_obj);
  }, [data]);

  return {
    notifications: data?.getNotify,
    error,
    loading,
    refetchNoti: refetch
  };
}
