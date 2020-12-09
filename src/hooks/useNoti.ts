import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { GET_NOTI } from 'src/graphql/notification/notify.query';

import { useQueryAuth } from './useApolloHookAuth';

export default function useNoti() {
  const { data, error, refetch } = useQueryAuth(GET_NOTI);

  useEffect(() => {
    if (!data) return;
  }, [data]);

  return {
    refetchNoti: refetch,
    notifications: data,
    error
  };
}
