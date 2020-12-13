import { Tab, Tabs } from '@material-ui/core';
import clsx from 'clsx';
import { useTranslation } from 'i18n';
import { DateTime } from 'luxon';
import Link from 'next/link';
import React, { useState } from 'react';
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
import { useQueryAuth } from 'src/hooks/useApolloHookAuth';
import withApollo from 'src/utils/withApollo';

import ConfirmCancelOrder from '../../components/Modules/My-orders/ConfirmCancelOrder';

const pageSize = 20;

export type FilterKey =
  | 'all'
  | 'wait_for_confirm'
  | 'confirmed'
  | 'handling'
  | 'delivering'
  | 'completed'
  | 'canceled';

const filterKeys: FilterKey[] = [
  'all',
  'wait_for_confirm',
  'confirmed',
  'handling',
  'delivering',
  'completed',
  'canceled'
];

const formatDate = (date: string) => {
  if (!date) return null;
  return DateTime.fromFormat(date, 'yyyy-MM-dd hh:mm:ss').toFormat('dd/MM/yyyy').toString();
};

const OrderItem = (props: GetOrderList) => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation(['myOrders']);

  const { flag } = props;

  return (
    <div className="my-orders__item p-3 my-1">
      <div className="my-orders__info">
        <h2 className="h4 d-flex align-items-center">
          <Link href={`/my-orders/${props.id}`}>
            <a className="mr-2">#{props.orderNo}</a>
          </Link>

          {flag === '25' && (
            <div className="my-orders__invoice">
              <span className="badge badge-danger">{t('myOrders:canceled')}</span>
            </div>
          )}
        </h2>

        <div className="my-orders__detail">
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

      <div className="my-orders__invoice">
        <button className="btn btn-outline-info btn-sm">{t('myOrders:report')}</button>

        {flag !== '25' && (
          <button className="btn btn-outline-danger btn-sm" onClick={() => setOpen(true)}>
            {t('myOrders:cancel_order')}
          </button>
        )}
      </div>

      <ConfirmCancelOrder open={open} onClose={() => setOpen(false)} orderNo={props.orderNo} />
    </div>
  );
};

const MyOrders = () => {
  const [filter, setFilter] = useState<FilterKey>('all');

  const { t } = useTranslation(['myOrders', 'errors']);

  const { data, refetch } = useQueryAuth<GetOrderListData, GetOrderListVars>(GET_ORDER_LIST, {
    variables: {
      page: 1,
      pageSize: pageSize
    },
    onError: (error) => {
      const errorCode = error.graphQLErrors?.[0]?.extensions?.code;

      if (errorCode) toast.error(t(`errors:code_${errorCode}`));
    }
  });

  const handleFilterChange = (e, key: FilterKey) => {
    setFilter(key);

    refetch({
      page: 1,
      pageSize: pageSize
    });
  };

  const orderList = data?.getOrderList || [];

  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>

      <Header />

      <Nav />

      {orderList.length !== 0 ? (
        <ProfileLayout title={t('myOrders:my_orders')}>
          {/* <p className="text-muted m-0">
              {t('myOrders:vat_invoice')} <Link href="/invoice-export-rules">{t('myOrders:here')}</Link>.
            </p> */}

          <div className="my-orders__filter mt-3">
            <Tabs
              variant="scrollable"
              scrollButtons="on"
              value={filter}
              onChange={handleFilterChange}
              indicatorColor="primary"
              textColor="primary">
              {filterKeys.map((key) => (
                <Tab key={key} label={t(`myOrders:${key}`)} value={key} />
              ))}
            </Tabs>
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
      ) : (
        <div></div>
      )}

      <Footer />
    </>
  );
};

export default withApollo({ ssr: true })(MyOrders);
