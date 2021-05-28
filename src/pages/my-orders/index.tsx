import { AppBar, Box, CircularProgress, Grid, Tab, Tabs } from '@material-ui/core';
import { useTranslation } from 'i18n';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import OrderItem from 'src/components/Modules/My-orders/OrderItem';
import ProfileLayout from 'src/components/Modules/ProfileLayout';
import {
  GET_ORDER_LIST,
  GetOrderListData,
  GetOrderListVars,
  OrderFlag
} from 'src/graphql/my-orders/getOrderList';
import { useQueryAuth } from 'src/hooks/useApolloHookAuth';
import getToken from 'src/utils/getToken';
import withToken from 'src/utils/withToken';

const PAGE_SIZE = 20;

const FLAGS = {
  ALL: 0,
  WAIT_CONFIRM: 10,
  RECEIVED: 15,
  CONFIRMED: 20,
  HANDLING: 30,
  DELIVERING: 40,
  COMPLETED: 80,
  CANCELED: 25
};

MyOrders.getInitialProps = async (ctx) => {
  try {
    await ctx.apolloClient.query({
      query: GET_ORDER_LIST,
      variables: {
        page: +ctx.query.page || 1,
        pageSize: PAGE_SIZE
      },
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
      context: {
        headers: {
          Authorization: getToken(ctx)
        }
      }
    });
  } catch (error) {
    console.log('getOrderList error:', error);
  }

  return {
    namespacesRequired: [...mainLayoutNamespacesRequired, 'myOrders']
  };
};

function MyOrders(): JSX.Element {
  const { t } = useTranslation(['myOrders', 'errors']);

  const router = useRouter();

  const [flag, setFlag] = useState<number>(FLAGS.ALL);

  const {
    data: orderListData,
    refetch,
    loading
  } = useQueryAuth<GetOrderListData, GetOrderListVars>(GET_ORDER_LIST, {
    variables: {
      page: +router.query.page || 1,
      pageSize: PAGE_SIZE,
      flag: (flag as OrderFlag) || undefined
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      toast.error(t(`errors:code_${error.graphQLErrors?.[0]?.extensions?.code}`));
    }
  });

  const orderList = orderListData?.getOrderList || [];

  return (
    <MainLayout>
      <Head>
        <title>Medofa - {t('myOrders:my_orders')}</title>
        <meta property="og:title" content="My orders" />
        <meta
          property="og:description"
          content="Medofa là giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối, nhà thuốc, dược sĩ nhằm hợp tác tạo mối liên kết trực tiếp và gia tăng doanh thu."
        />
        <meta property="og:url" content="https://medofa.com/" />
        <meta
          property="og:image"
          content="https://medofa.com/icons/favicon-32x32-medofa-manifest-20129.png"
        />
      </Head>

      <ProfileLayout title={t('myOrders:my_orders')}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <AppBar position="static" color="default">
              <Tabs
                variant="scrollable"
                scrollButtons="auto"
                value={flag}
                onChange={(event, value) => setFlag(value)}
                indicatorColor="primary"
                textColor="primary"
                aria-label="scrollable auto tabs example">
                <Tab value={0} label={t('myOrders:all_order')} />
                <Tab value={10} label={t('myOrders:wait_for_confirm')} />
                <Tab value={15} label={t('myOrders:received')} />
                <Tab value={20} label={t('myOrders:confirmed')} />
                <Tab value={30} label={t('myOrders:handling')} />
                <Tab value={40} label={t('myOrders:delivering')} />
                <Tab value={80} label={t('myOrders:completed')} />
                <Tab value={25} label={t('myOrders:canceled')} />
              </Tabs>
            </AppBar>
          </Grid>

          {loading ? (
            <Grid item xs={12}>
              <Box textAlign="center">
                <CircularProgress size={75} />
              </Box>
            </Grid>
          ) : orderList?.length === 0 ? (
            <Grid item xs={12}>
              <Box textAlign="center">
                <p>{t('myOrders:no_orders')}</p>
                <p>
                  <Link href="/products">
                    <a className="btn btn-primary" role="button">
                      {t('myOrders:back_to_products_page')}
                    </a>
                  </Link>
                </p>
              </Box>
            </Grid>
          ) : (
            orderList?.map((order) => (
              <Grid item xs={12} key={order.id}>
                <OrderItem
                  {...order}
                  onCancelCompleted={() =>
                    refetch({
                      page: 1,
                      pageSize: PAGE_SIZE
                    })
                  }
                />
              </Grid>
            ))
          )}
        </Grid>
      </ProfileLayout>
    </MainLayout>
  );
}

export default withToken({ ssr: true, isProtected: true })(MyOrders);
