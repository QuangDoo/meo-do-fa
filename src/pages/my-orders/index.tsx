import clsx from 'clsx';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import ProfileLayout from 'src/components/Modules/ProfileLayout';
import { GET_ORDER_LIST, GetOrderList } from 'src/graphql/my-orders/getOrderList';
import { useLazyQueryAuth, useQueryAuth } from 'src/hooks/useApolloHookAuth';
import withApollo from 'src/utils/withApollo';

import ConfirmCancelOrder from '../../components/Modules/My-orders/ConfirmCancelOrder';

type FilterKey = 'all' | 'waiting_confirmation' | 'completed' | 'canceled';

const pageSize = 20;

const OrderItem = (props: GetOrderList) => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation(['myOrders']);

  const { state } = props;

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
            <span className="title">{t('myOrders:date_order')}</span>
            <span className="content">
              {new Date(props.date_order).toLocaleDateString('en-GB')}
            </span>
          </div>

          <div>
            <span className="title">{t('myOrders:expected_date')}</span>
            <span className="content">
              {new Date(props.expected_date).toLocaleDateString('en-GB')}
            </span>
          </div>
        </div>
      </div>

      {/* <p className="my-orders__price">{props.totalPrice.toLocaleString()} đ</p> */}

      <div className="my-orders__invoice">
        <button className="btn btn-secondary btn-sm mr-2" type="button">
          {t('myOrders:billing_export')}
        </button>
        <button className="btn btn-outline-info btn-sm">{t('myOrders:report')}</button>
        <button
          hidden={state === 'cancel'}
          className="btn btn-outline-danger btn-sm"
          onClick={() => setOpen(true)}>
          {t('myOrders:cancel_the_order')}
        </button>
      </div>
      {state === 'cancel' && (
        <div className="my-orders__invoice">
          <button className="btn btn-sm btn-outline-danger" disabled>
            {t('myOrders:canceled')}
          </button>
        </div>
      )}

      <ConfirmCancelOrder open={open} onClose={() => setOpen(false)} orderNo={props.orderNo} />
    </div>
  );
};

const MyOrders = () => {
  const [filter, setFilter] = useState<FilterKey>();

  const { data, error, refetch } = useQueryAuth(GET_ORDER_LIST, {
    variables: {
      page: 1,
      pageSize: pageSize
    },
    onError: (error) => {
      console.log('Get order list error:', { error });
      toast.error('Get order list error: ' + error);
    }
  });

  const { t } = useTranslation(['myOrders']);

  const orderList = data?.getOrderList || [];

  const filterHeaders: Record<FilterKey, string> = {
    all: t('myOrders:all_order'),
    waiting_confirmation: t('myOrders:wait_for_confirm'),
    completed: t('myOrders:complete'),
    canceled: t('myOrders:canceled')
  };

  const handleFilterClick = (key: FilterKey) => {
    setFilter(key);
    refetch({
      page: 1,
      pageSize: pageSize
    });
  };

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      <ProfileLayout title={t('myOrders:my_orders')}>
        <p className="text-muted m-0">
          {t('myOrders:vat_invoice')} <Link href="/invoice-export-rules">{t('myOrders:here')}</Link>
          .
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

        {orderList.map((order) => (
          <OrderItem key={order.id} {...order} />
        ))}

        <div className="col-12 m-3 text-center">
          <p>
            <Link href="/products">
              <a className="btn btn-primary" role="button">
                {t('myOrders:back_to_products_page')}
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
