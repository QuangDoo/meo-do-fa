import { useEffect } from 'react';
import { GET_NOTI, GetNotiData } from 'src/graphql/notification/notify.query';

import { useQueryAuth } from './useApolloHookAuth';

export default function useNoti() {
  const { data, error, loading, refetch } = useQueryAuth<GetNotiData, undefined>(GET_NOTI);

  useEffect(() => {
    if (!data) return;
  }, [data]);

  return {
    notifications: data,
    error,
    loading,
    refetchNoti: refetch
  };
}
