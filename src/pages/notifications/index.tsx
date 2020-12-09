import clsx from 'clsx';
import { useTranslation } from 'i18n';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { SEEN_NOTI } from 'src/graphql/notification/seenNoti.mutation';
import { useMutationAuth } from 'src/hooks/useApolloHookAuth';
import useNoti from 'src/hooks/useNoti';
import withApollo from 'src/utils/withApollo';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import NotiItem from './NotiItem';

const Notification = (): JSX.Element => {
  const [isRead, setIsRead] = useState(Boolean);

  const { notifications, refetchNoti } = useNoti();

  const notificationsData = notifications?.getNotify;

  useEffect(() => {
    if (!notifications) return;
  }, [notifications]);

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

            <button className="btn btn-secondary btn-sm">{t('noti:mark_as_read')}</button>
          </div>
          {notificationsData?.length > 0
            ? notificationsData?.map((noti, index) => {
                return <NotiItem {...noti} key={index} />;
              })
            : `${t('noti:is_noty')}`}
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
      <Footer />
    </>
  );
};
export default withApollo({ ssr: true })(Notification);
