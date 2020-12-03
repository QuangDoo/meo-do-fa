import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { GET_NOTI } from 'src/graphql/notification/notify';

export default function useNoti() {
  const [getNoti, { data, error }] = useLazyQuery(GET_NOTI);

  useEffect(() => {
    getNoti();
  }, [getNoti]);

  return {
    getNoti,
    notifications: data,
    error
  };
}
