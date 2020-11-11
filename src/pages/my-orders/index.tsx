import Link from 'next/link';
import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import PageLayout from 'src/components/Layout/PageLayout';
import ProfileSidebar from 'src/components/Modules/ProfileSidebar';
import { mockMyOrders } from 'src/mockData/mockMyOrders';

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
  let token = '';
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
    // console.log('Product card data:', props)
  }
  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <section className="py-5 order-list container">
        <div className="row">
          <ProfileSidebar />

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
            {mockMyOrders.map((item, index) => {
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

      <Footer />
    </>
  );
};
export default MyOrders;
