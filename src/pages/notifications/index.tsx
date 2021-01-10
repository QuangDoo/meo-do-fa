import { useTranslation } from 'i18n';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import Pagination from 'src/components/Modules/Pagination';
import { SEEN_ALL_NOTI } from 'src/graphql/notification/seenNoti.mutation';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import useNoti from 'src/hooks/useNoti';
import withApollo from 'src/utils/withApollo';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import NotiItem from '../../components/Modules/Noti/NotiItem';

const pageSize = 10;

const Notification = (): JSX.Element => {
  const router = useRouter();

  const page = +router.query.page || 1;

  const { notifications, loading: loadingNoti, refetchNoti } = useNoti({ page, pageSize });

  useEffect(() => {
    refetchNoti?.();
  }, []);

  const [seenAllNoti] = useMutationAuth(SEEN_ALL_NOTI, {
    onCompleted: (data: any) => {
      console.log('data', data);
    },
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const notificationsData = notifications?.Notifies;

  const notificationsPagination = notifications?.total || 0;

  console.log('notificationsPagination', notificationsPagination);

  const handleReadAll = () => {
    // read all
    seenAllNoti();
    refetchNoti();
  };

  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>
      <Header />
      <Nav />
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
            notificationsData?.map((noti, index) => {
              return <NotiItem {...noti} key={index} />;
            })
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
      <LoadingBackdrop open={loadingNoti} />
      <Footer />
    </>
  );
};
export default withApollo({ ssr: true })(Notification);
