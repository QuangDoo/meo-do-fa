import clsx from 'clsx';
import { useTranslation } from 'i18n';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import useNoti from 'src/hooks/useNoti';
import withApollo from 'src/utils/withApollo';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';

const Notification = (): JSX.Element => {
  const [isRead, setIsRead] = useState(Boolean);

  const { notifications } = useNoti();

  useEffect(() => {
    if (!notifications) return;
  }, [notifications]);

  const notificationsData = notifications?.getNotify || [];

  const handleRead = () => {
    notificationsData.map((noti) => {
      setIsRead(noti.isSeen);
    });
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

            <button className="btn btn-secondary btn-sm" onClick={handleRead}>
              {t('noti:mark_as_read')}
            </button>
          </div>
          {notificationsData.length > 0
            ? notificationsData?.map((noti, index) => {
                return (
                  <div className="col-12 mb-3" key={index}>
                    <a
                      className={clsx(
                        'notification__item unread',
                        noti.isSeen && 'notification__item read'
                      )}
                      href="/notifications/1571210">
                      <div className="notification__icon">
                        <i className="status-icon status-notice" />
                      </div>
                      <div className="notification__content">
                        <div
                          className="notification__content-title"
                          dangerouslySetInnerHTML={{ __html: noti.content }}
                        />
                        <small className="notification__content-created-at">
                          {moment(noti.create_date)
                            .locale(`${t('noti:time')}`)
                            .fromNow()}
                        </small>
                      </div>
                    </a>
                  </div>
                );
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
