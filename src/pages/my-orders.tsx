import Link from 'next/link';
import React from 'react';

import CartItem from '../components/Cart/CartItem';
import Footer from '../components/Footer';
import Head from '../components/Head';
import { Header } from '../components/Header';
import PageLayout from '../components/layout/PageLayout';
import { Nav } from '../components/Nav';

const OrderItem = (props) => {
  return (
    <div className="my-orders__item my-orders__item:hover pl-4 mt-1">
      <div className="my-orders__info">
        <h2 className="h4 d-flex align-items-center">
          <Link href="/my-orders/218781">
            <a className="mr-2">#{props.id}</a>
          </Link>

          <span
            className={
              props.status === 'Đã xác nhận'
                ? 'badge py-1 text-capitalize my-orders__status--confirmed'
                : 'badge py-1 text-capitalize my-orders__status--shipped'
            }>
            <a href="/my-orders?status=confirmed">{props.status}</a>
          </span>
        </h2>
        <div className="my-orders__detail">
          <div>
            <span className="title">Sản phẩm:</span>
            <span className="content">{props.quantity}</span>
          </div>
          <div>
            <span className="title">Ngày mua:</span>
            <span className="content">{props.dayByDay}</span>
          </div>
          <div>
            <span className="title">Dự kiến giao ngày:</span>
            <span className="content">{props.duKienGiaoHang}</span>
          </div>
        </div>
      </div>
      <p className="my-orders__price">{props.price.toLocaleString()} đ</p>
      <div className="my-orders__invoice">
        <button className="btn btn-secondary btn-sm  mr-2" type="button">
          Xuất hóa đơn
        </button>
        <button className="btn btn-outline-info btn-sm">Gửi phản hồi</button>
      </div>
    </div>
  );
};

const MyOrders = (props): JSX.Element => {
  const orders = [
    {
      id: 218781,
      status: 'Đã xác nhận',
      quantity: 20,
      dayByDay: '04/11/2020 07:19:56',
      duKienGiaoHang: 'Thứ ba (10/11/2020)',
      price: 1000000
    },
    {
      id: 218782,
      status: 'Hoàn tất',
      quantity: 21,
      dayByDay: '04/11/2020 07:19:56',
      duKienGiaoHang: 'Thứ hai (09/11/2020)',
      price: 14123123
    },
    {
      id: 218783,
      status: 'Đã xác nhận',
      quantity: 22,
      dayByDay: '04/11/2020 07:19:56',
      duKienGiaoHang: 'Thứ tư (11/11/2020)',
      price: 124324234
    },
    {
      id: 218784,
      status: 'Hoàn tất',
      quantity: 23,
      dayByDay: '04/11/2020 07:19:56',
      duKienGiaoHang: 'Thứ năm (12/11/2020)',
      price: 4562345243
    },
    {
      id: 218785,
      status: 'Đã xác nhận',
      quantity: 24,
      dayByDay: '04/11/2020 07:19:56',
      duKienGiaoHang: 'Thứ sáu (13/11/2020)',
      price: 14523452345
    }
  ];
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
    // console.log('Product card data:', props)
  }
  return (
    <>
      <Head>
        <title>Thuoc N</title>
      </Head>
      <Header />
      <Nav />
      <PageLayout>
        <section className="py-5 order-list container">
          <div className="row">
            <div className="col-xl-3 d-xl-block d-none">
              <aside className="my-account__sidebar mb-3">
                <div className="mb-3">
                  Tài khoản của<h5>Trường</h5>
                </div>
                <a className="my-account__sidebar-item my-account__sidebar-link" href="/my-account">
                  <i className="far fa-user-circle my-account__sidebar-icon" />
                  Thông tin tài khoản
                </a>
                <a
                  className="my-account__sidebar-item my-account__sidebar-link active"
                  href="/my-orders">
                  <i className="icomoon icon-assignment my-account__sidebar-icon" />
                  Đơn hàng của tôi
                </a>
                <a
                  className="my-account__sidebar-item my-account__sidebar-link"
                  href="/users/referrals">
                  <i className="icomoon icon-share my-account__sidebar-icon" />
                  Giới thiệu bạn bè
                </a>
                <a
                  className="my-account__sidebar-item my-account__sidebar-link"
                  href="/users/user-promo-codes">
                  <i className="fas fa-tags my-account__sidebar-icon" />
                  Mã giảm giá của tôi
                </a>
                <a
                  className="my-account__sidebar-item my-account__sidebar-link"
                  href="/users/loyalty_points">
                  <i className="fas fa-hand-holding-usd my-account__sidebar-icon" />
                  Điểm tích lũy
                </a>
                <div className="my-account__sidebar-item">
                  Ví -{' '}
                  <span data-target="user-data.wallet">
                    0<span className="unit">đ</span>
                  </span>
                </div>
              </aside>
            </div>
            <div className="col-xl-9 col-sm-12 my-orders">
              <div data-controller="my-orders">
                <h1 className="h2 text-center text-primary mb-3">Đơn hàng của tôi</h1>
                <p className="my-orders__condition" />
                <p className="text-muted m-0">Xem thông tin xuất hoá đơn đỏ tại đây</p>
                <div className="my-orders__filter mt-3">
                  <div
                    className="my-orders__header active"
                    data-action="click->my-orders#show"
                    data-filter="all"
                    data-target="my-orders.status">
                    <Link href="/my-orders">
                      <a>Tất cả</a>
                    </Link>
                  </div>
                  <div
                    className="my-orders__header"
                    data-action="click->my-orders#show"
                    data-filter="to_confirm"
                    data-target="my-orders.status">
                    <a href="/my-orders?status=to_confirm">Chờ xác nhận</a>
                  </div>
                  <div
                    className="my-orders__header"
                    data-action="click->my-orders#show"
                    data-filter="completed"
                    data-target="my-orders.status">
                    <a href="/my-orders?status=completed">Hoàn tất</a>
                  </div>
                  <div
                    className="my-orders__header"
                    data-action="click->my-orders#show"
                    data-filter="canceled"
                    data-target="my-orders.status">
                    <a href="/my-orders?status=canceled">Hủy</a>
                  </div>
                </div>
              </div>
              {orders.map((item, index) => {
                return <OrderItem key={index} {...item} />;
              })}

              <div className="col-12 m-3 text-center">
                <p>
                  <Link href="/quick-order">
                    <a className="btn btn-primary" role="button">
                      Về trang đặt hàng nhanh
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
      <Footer />
    </>
  );
};
export default MyOrders;
