import Link from 'next/link';
import React from 'react';

import CartItem from '../components/Cart/CartItem';
import Footer from '../components/Footer';
import Head from '../components/Head';
import { Header } from '../components/Header';
import Layout from '../components/Layout/Layout';
import { Nav } from '../components/Nav';

const MyOrders = (props): JSX.Element => {
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
      <Layout>
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
              <div className="my-orders__item my-orders__item:hover pl-4 mt-1">
                <div className="">
                  <div className="row">
                    <a>#987654</a>
                    <div className="my-orders__info">
                      <span>
                        <a className="my-orders__status--completed">Hoàn tất</a>
                      </span>
                    </div>
                  </div>
                  <div className="my-orders__detail row">
                    <p className="title ">Sản phẩm:</p>
                    <p className="content ">30</p>
                  </div>
                  <div className="my-orders__detail row mt--1">
                    <p className="title ">Ngày mua:</p>
                    <p className="content ">03/06/2020</p>
                  </div>
                  <div className="my-orders__detail row mt--1">
                    <p className="title ">Dự kiến giao ngày:</p>
                    <p className="content ">Thứ bảy (06/06/2020)</p>
                  </div>
                </div>
                <p className="my-orders__price">123456789 đ</p>
                <div className="my-orders__invoice">
                  <button className="btn btn-secondary btn-sm  mr-2" type="button">
                    Xuất hóa đơn
                  </button>
                  <button className="btn btn-outline-info btn-sm">Gửi phản hồi</button>
                </div>
              </div>
              <div className="col-12 m-3 text-center">
                <p>
                  <a className="btn btn-primary" href="/quick-order" role="button">
                    Về trang đặt hàng nhanh
                  </a>
                </p>
              </div>

              <div className="col-12 mt-4" />
            </div>
          </div>
        </section>
      </Layout>
      <Footer />
    </>
  );
};
export default MyOrders;
