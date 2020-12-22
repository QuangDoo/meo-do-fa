import { AppBar, Box, makeStyles, Tab, Tabs, Theme, Typography } from '@material-ui/core';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Loading from 'src/components/Layout/Loading';
import Nav from 'src/components/Layout/Nav';
import ProfileLayout from 'src/components/Modules/ProfileLayout';
import {
  GET_ORDER_LIST,
  GetOrderListData,
  GetOrderListVars,
  OrderFlag
} from 'src/graphql/my-orders/getOrderList';
import { useQueryAuth } from 'src/hooks/useApolloHookAuth';
import withApollo from 'src/utils/withApollo';

import ConfirmCancelOrder from '../../components/Modules/My-orders/ConfirmCancelOrder';

const pageSize = 20;

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%'
  }
}));

type Props = {
  flag: OrderFlag;
};

const OrderItem = (props: any) => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation(['myOrders']);

  const { callBack, flag } = props;

  console.log(props);
  return (
    <div className="my-orders__item p-3 my-1">
      <div className="my-orders__info">
        <h2 className="h4 d-flex align-items-center">
          <Link href={`/my-orders/${props.orderNo}`}>
            <a className="mr-2">#{props.orderNo}</a>
          </Link>

          {flag === 25 && (
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

        {flag !== 25 ? (
          <button className="btn btn-outline-danger btn-sm" onClick={() => setOpen(true)}>
            {t('myOrders:cancel_order')}
          </button>
        ) : (
          <button className="btn btn-outline-danger btn-sm" disabled onClick={() => setOpen(true)}>
            {t('myOrders:canceled')}
          </button>
        )}
      </div>

      <ConfirmCancelOrder
        open={open}
        onClose={() => setOpen(false)}
        orderNo={props.orderNo}
        callBack={callBack}
      />
    </div>
  );
};

const OrderList = (props: Props) => {
  console.log(props);
  const { t } = useTranslation(['myOrders']);
  const { data, refetch, loading } = useQueryAuth<GetOrderListData, GetOrderListVars>(
    GET_ORDER_LIST,
    {
      variables: {
        page: 1,
        pageSize: pageSize,
        flag: props.flag
      },
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
      onError: (error) => {
        const errorCode = error.graphQLErrors?.[0]?.extensions?.code;

        if (errorCode) toast.error(t(`errors:code_${errorCode}`));
      }
    }
  );

  const orderList = data?.getOrderList || [];

  return (
    <>
      {loading ? (
        <Loading />
      ) : orderList.length !== 0 ? (
        orderList.map((order) => (
          <OrderItem
            key={order.id}
            {...order}
            callBack={() =>
              refetch({
                page: 1,
                pageSize: pageSize
              })
            }
          />
        ))
      ) : (
        <div>{t('myOrders:no_orders')}</div>
      )}
    </>
  );
};

const MyOrders = () => {
  const [value, setValue] = React.useState(0);

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

  const handleFilterChange = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);

    refetch({
      page: 1,
      pageSize: pageSize
    });
  };

  const orderList = data?.getOrderList || [];
  const classes = useStyles();

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

          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                variant="scrollable"
                scrollButtons="auto"
                value={value}
                onChange={handleFilterChange}
                indicatorColor="primary"
                textColor="primary"
                aria-label="scrollable auto tabs example">
                <Tab label={t('myOrders:all_order')} {...a11yProps(0)} />
                <Tab label={t('myOrders:wait_for_confirm')} {...a11yProps(1)} />
                <Tab label={t('myOrders:confirmed')} {...a11yProps(2)} />
                <Tab label={t('myOrders:handling')} {...a11yProps(3)} />
                <Tab label={t('myOrders:delivering')} {...a11yProps(4)} />
                <Tab label={t('myOrders:completed')} {...a11yProps(5)} />
                <Tab label={t('myOrders:canceled')} {...a11yProps(6)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              {orderList.map((order) => (
                <OrderItem
                  key={order.id}
                  {...order}
                  callBack={() =>
                    refetch({
                      page: 1,
                      pageSize: pageSize
                    })
                  }
                />
              ))}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <OrderList flag={10} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <OrderList flag={20} />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <OrderList flag={30} />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <OrderList flag={40} />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <OrderList flag={80} />
            </TabPanel>
            <TabPanel value={value} index={6}>
              <OrderList flag={25} />
            </TabPanel>
          </div>

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
