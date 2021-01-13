import { GET_NOTI, GetNotiData, GetNotiVars } from 'src/graphql/notification/notify.query';

import { useQueryAuth } from './useApolloHookAuth';

type Notify = {
  page: number;
  pageSize: number;
};

export default function useNoti(props: Notify) {
  const { data, error, loading, refetch } = useQueryAuth<GetNotiData, GetNotiVars>(GET_NOTI, {
    variables: { page: props?.page, pageSize: props?.pageSize },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      setTimeout(() => {
        refetch();
      }, [600000]);
    }
  });

  return {
    notifications: data?.getNotify,
    error,
    loading,
    refetchNoti: refetch
  };
}
