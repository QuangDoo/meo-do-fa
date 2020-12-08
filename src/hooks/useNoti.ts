import { useEffect } from 'react';
import { GET_NOTI } from 'src/graphql/notification/notify';

import { useLazyQueryAuth, useQueryAuth } from './useApolloHookAuth';

export default function useNoti() {
  const { data, error, refetch } = useQueryAuth(GET_NOTI);

  useEffect(() => {
    if (!data) return;
  }, [data]);

  return {
    notifications: data,
    error,
    refetchNoti: refetch
  };
}
