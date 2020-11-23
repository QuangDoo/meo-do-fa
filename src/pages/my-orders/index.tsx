import { useLazyQuery } from '@apollo/react-hooks';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import ProfileLayout from 'src/components/Modules/ProfileLayout';
import {
  GET_ORDER_LIST,
  GetOrderList,
  GetOrderListData,
  GetOrderListVars
} from 'src/graphql/my-orders/getOrderList';
import withApollo from 'src/utils/withApollo';

type FilterKey = 'all' | 'waiting_for_confirmation' | 'completed' | 'canceled';

const pageSize = 20;

const OrderItem = (props: GetOrderList) => {
  return (
    <div className="my-orders__item my-orders__item:hover pl-4 mt-1">
      <div className="my-orders__info">
        <h2 className="h4 d-flex align-items-center">
          <Link href={`/my-orders/${props.id}`}>
            <a className="mr-2">#{props.id}</a>
          </Link>

          {/* <span
            className={clsx(
              'badge py-1 text-capitalize',
              props.status === 'Đã xác nhận'
                ? 'my-orders__status--confirmed'
                : 'my-orders__status--shipped'
            )}>
            <a href="/my-orders?status=confirmed">{props.status}</a>
          </span> */}
        </h2>

        <div className="my-orders__detail">
          {/* <div>
            <span className="title">Sản phẩm:</span>
            <span className="content">{props.totalProducts}</span>
          </div> */}

          <div>
            <span className="title">Ngày mua:</span>
            <span className="content">{props.date_order}</span>
          </div>

          <div>
            <span className="title">Dự kiến giao ngày:</span>
            <span className="content">{props.expected_date}</span>
          </div>
        </div>
      </div>

      {/* <p className="my-orders__price">{props.totalPrice.toLocaleString()} đ</p> */}

      <div className="my-orders__invoice">
        <button className="btn btn-secondary btn-sm mr-2" type="button">
          Xuất hóa đơn
        </button>
        <button className="btn btn-outline-info btn-sm">Gửi phản hồi</button>
      </div>
    </div>
  );
};

const MyOrders = (): JSX.Element => {
  const [getOrderList, { data, error }] = useLazyQuery<GetOrderListData, GetOrderListVars>(
    GET_ORDER_LIST
  );

  useEffect(() => {
    if (!error) return;

    console.log('Get order list error:', { error });
    toast.error('Get order list error: ' + error);
  }, [error]);

  useEffect(() => {
    getOrderList({
      variables: {
        page: 1,
        pageSize: pageSize
      }
    });
  }, []);

  const orderList = data?.getOrderList || [];

  const [filter, setFilter] = useState<FilterKey>('all');

  const filterHeaders: Record<FilterKey, string> = {
    all: 'Tất cả',
    waiting_for_confirmation: 'Chờ xác nhận',
    completed: 'Hoàn tất',
    canceled: 'Đã hủy'
  };

  const handleFilterClick = (key: FilterKey) => {
    setFilter(key);
    getOrderList({
      variables: {
        page: 1,
        pageSize: pageSize
      }
    });
  };

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <ProfileLayout>
        <div>
          <h1 className="h2 text-center text-primary mb-3">Đơn hàng của tôi</h1>

          <p className="text-muted m-0">
            Xem thông tin xuất hoá đơn đỏ <Link href="/invoice-export-rules">tại đây</Link>.
          </p>

          <div className="my-orders__filter mt-3">
            {Object.keys(filterHeaders).map((key: FilterKey) => (
              <button
                key={key}
                className={clsx('my-orders__header', filter === key && 'active')}
                onClick={() => handleFilterClick(key)}>
                {filterHeaders[key]}
              </button>
            ))}
          </div>
        </div>

        {orderList.map((order) => (
          <OrderItem key={order.id} {...order} />
        ))}

        <div className="col-12 m-3 text-center">
          <p>
            <Link href="/products">
              <a className="btn btn-primary" role="button">
                Về trang sản phẩm
              </a>
            </Link>
          </p>
        </div>
      </ProfileLayout>

      <Footer />
    </>
  );
};
export default withApollo({ ssr: true })(MyOrders);
