import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
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

  const notificationsData = notifications?.getNotify;

  useEffect(() => {
    if (!notifications) return;
  }, [notifications]);

  const handleRead = () => {
    setIsRead(true);
  };

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
            <h1 className="h3">Thông Báo của tôi</h1>

            <button className="btn btn-secondary btn-sm" onClick={handleRead}>
              Đánh dấu đọc tất cả
            </button>
          </div>
          {notificationsData?.map((noti, index) => (
            <div className="col-12 mb-3" key={index}>
              <a
                className={clsx('notification__item unread', isRead && 'notification__item read')}
                href="/notifications/1571210">
                <div className="notification__icon">
                  <i className="status-icon status-notice" />
                </div>
                <div className="notification__content">
                  <div
                    className="notification__content-title"
                    dangerouslySetInnerHTML={{ __html: noti.body }}
                  />
                  <small className="notification__content-created-at">{noti.date}</small>
                </div>
              </a>
            </div>
          ))}
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
