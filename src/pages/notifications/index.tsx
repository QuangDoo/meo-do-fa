import Link from 'next/link';
import React from 'react';
import withApollo from 'src/utils/withApollo';

import Footer from '../../components/Layout/Footer';
import Head from '../../components/Layout/Head';
import Header from '../../components/Layout/Header';
import Nav from '../../components/Layout/Nav';
import { mockMyNoti } from '../../mockData/mockMyNoti';
const Notification = (): JSX.Element => {
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
            <Link href="/notification/read">
              <a className="btn btn-secondary btn-sm">Đánh dấu đọc tất cả</a>
            </Link>
          </div>
          {mockMyNoti.map((noti, index) => (
            <div className="col-12 mb-3" key={index}>
              <a className="notification__item unread" href="/notifications/1571210">
                <div className="notification__icon">
                  <i className="status-icon status-notice" />
                </div>
                <div className="notification__content">
                  <div className="notification__content-title">{noti.name}</div>
                  <small className="notification__content-created-at">{noti.time}</small>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};
export default withApollo({ ssr: true })(Notification);
