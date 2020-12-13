import { useTranslation } from 'i18n';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingBackdrop from 'src/components/Layout/LoadingBackdrop';
import { SEEN_ALL_NOTI } from 'src/graphql/notification/seenNoti.mutation';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import useNoti from 'src/hooks/useNoti';
import withApollo from 'src/utils/withApollo';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import NotiItem from '../../components/Modules/Noti/NotiItem';

const Notification = (): JSX.Element => {
  const [isRead, setIsRead] = useState(false);

  const { notifications, loading: loadingNoti, refetchNoti } = useNoti();

  const [seenAllNoti] = useMutationAuth(SEEN_ALL_NOTI, {
    onCompleted: (data) => {
      console.log('data', data);
      if (data.code === 200) {
        setIsRead(true);
      }
    },
    onError: (err) => {
      toast.error(t(`errors:code_${err.graphQLErrors[0].extensions.code}`));
    }
  });

  useEffect(() => {
    if (!notifications) return;
    refetchNoti();
  }, [notifications]);

  const notificationsData = notifications?.getNotify || [];

  const notificationsReverse = notificationsData?.map((item) => {
    return item;
  });

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

            {/* {notificationsData?.length > 0 && (
              <button className="btn btn-secondary btn-sm" onClick={handleReadAll}>
                {t('noti:mark_as_read')}
              </button>
            )} */}
          </div>
          {notificationsData?.length > 0 ? (
            notificationsReverse?.reverse()?.map((noti, index) => {
              return <NotiItem {...noti} key={index} isRead={isRead} />;
            })
          ) : (
            <div className="col-12 d-flex align-items-center justify-content-between flex-wrap mb-3">
              {t('noti:is_noty')}
            </div>
          )}
        </div>
      </div>

      {/* <Pagination
        count={Math.ceil(total / pageSize)}
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
      /> */}
      <LoadingBackdrop open={loadingNoti} />
      <Footer />
    </>
  );
};
export default withApollo({ ssr: true })(Notification);
