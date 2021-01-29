import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import Pagination from 'src/components/Modules/Pagination';
import { useNotify } from 'src/contexts/Notify';
import {
  GET_NOTI,
  GetNotiData,
  GetNotiVars,
  Notifies
} from 'src/graphql/notification/notify.query';
import { SEEN_ALL_NOTI, SEEN_NOTI } from 'src/graphql/notification/seenNoti.mutation';
import { useMutationAuth, useQueryAuth } from 'src/hooks/useApolloHookAuth';
import asyncQuery from 'src/utils/asyncQuery';
import getToken from 'src/utils/getToken';
import withToken from 'src/utils/withToken';

import Head from '../../components/Layout/Head';
import NotiItem from '../../components/Modules/Noti/NotiItem';

const PAGE_SIZE = 10;

Notification.getInitialProps = async (ctx) => {
  await asyncQuery<GetNotiData, GetNotiVars>({
    ctx,
    query: GET_NOTI,
    variables: {
      page: +ctx.query.page || 1,
      pageSize: PAGE_SIZE
    },
    auth: true,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true
  });

  return {
    namespacesRequired: [...mainLayoutNamespacesRequired]
  };
};

function Notification() {
  const { t } = useTranslation(['noti', 'errors']);

  const router = useRouter();

  const page = +router.query.page || 1;

  const { refetch: refetchNotiContext } = useNotify();

  const { data, loading, refetch: refetchNotiCurrent } = useQueryAuth<GetNotiData, GetNotiVars>(
    GET_NOTI,
    {
      variables: {
        page,
        pageSize: PAGE_SIZE
      },
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
      onError: (err) => {
        toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
      }
    }
  );

  const [seenNotify] = useMutationAuth(SEEN_NOTI);

  const [seenAllNoti] = useMutationAuth(SEEN_ALL_NOTI, {
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    },
    onCompleted: () => {
      refetchNotiCurrent();
      refetchNotiContext();
    }
  });

  const notifications = data?.getNotify?.Notifies || [];

  const total = data?.getNotify?.total || 0;

  const handleReadAll = () => {
    seenAllNoti();
  };

  const handleNotiItemClick = (notiItem: Notifies) => {
    seenNotify({
      variables: {
        _id: notiItem._id
      }
    });
  };

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <div className="container py-5" data-controller="notification">
        <div className="row">
          <div className="col-12 d-flex align-items-center justify-content-between flex-wrap mb-3">
            <h1 className="h3">{t('noti:my_noti')}</h1>

            {notifications?.length > 0 && (
              <button className="btn btn-secondary btn-sm" onClick={handleReadAll}>
                {t('noti:mark_as_read')}
              </button>
            )}
          </div>
          {notifications?.length > 0 ? (
            notifications?.map((noti, index) => (
              <NotiItem {...noti} key={index} onClick={() => handleNotiItemClick(noti)} />
            ))
          ) : (
            <div className="col-12 d-flex align-items-center justify-content-between flex-wrap mb-3">
              {t('noti:is_noty')}
            </div>
          )}
        </div>
      </div>

      <Pagination
        count={Math.ceil(total / PAGE_SIZE)}
        page={page}
        siblingCount={4}
        onChange={(page) =>
          router.push({
            pathname: router.pathname,
            query: {
              ...router.query,
              page: page
            }
          })
        }
      />
      <LoadingBackdrop open={loading} />
    </MainLayout>
  );
}
export default withToken({ ssr: true, isProtected: true })(Notification);
