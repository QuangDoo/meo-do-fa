import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import Pagination from 'src/components/Modules/Pagination';
import { SEEN_ALL_NOTI } from 'src/graphql/notification/seenNoti.mutation';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import useNoti from 'src/hooks/useNoti';

import Head from '../../components/Layout/Head';
import NotiItem from '../../components/Modules/Noti/NotiItem';

const pageSize = 10;

import withToken from 'src/utils/withToken';

Notification.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired]
});

function Notification() {
  const router = useRouter();

  const page = +router.query.page || 1;

  const { notifications, refetchNoti } = useNoti({ page, pageSize });

  useEffect(() => {
    refetchNoti?.();
  }, []);

  const [seenAllNoti] = useMutationAuth(SEEN_ALL_NOTI, {
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const notificationsData = notifications?.Notifies;

  const notificationsPagination = notifications?.total || 0;

  const handleReadAll = () => {
    // read all
    seenAllNoti();
    refetchNoti();
  };

  const { t } = useTranslation();

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <div className="container py-5" data-controller="notification">
        <div className="row">
          <div className="col-12 d-flex align-items-center justify-content-between flex-wrap mb-3">
            <h1 className="h3">{t('noti:my_noti')}</h1>

            {notificationsData?.length > 0 && (
              <button className="btn btn-secondary btn-sm" onClick={handleReadAll}>
                {t('noti:mark_as_read')}
              </button>
            )}
          </div>
          {notificationsData?.length > 0 ? (
            notificationsData?.map((noti, index) => <NotiItem {...noti} key={index} />)
          ) : (
            <div className="col-12 d-flex align-items-center justify-content-between flex-wrap mb-3">
              {t('noti:is_noty')}
            </div>
          )}
        </div>
      </div>

      <Pagination
        count={Math.ceil(notificationsPagination / pageSize)}
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
    </MainLayout>
  );
}
export default withToken({ ssr: true, isProtected: true })(Notification);
