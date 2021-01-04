import { useEffect } from 'react';
import { GET_NOTI, GetNotiData } from 'src/graphql/notification/notify.query';

import { useQueryAuth } from './useApolloHookAuth';

export default function useNoti() {
  const { data, error, loading, refetch } = useQueryAuth<GetNotiData, undefined>(GET_NOTI, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true
  });

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    notifications: data,
    error,
    loading,
    refetchNoti: refetch
  };
}
