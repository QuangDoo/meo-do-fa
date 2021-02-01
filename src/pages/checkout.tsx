import React from 'react';
import Head from 'src/components/Layout/Head';
import CheckoutPage from 'src/components/Modules/Checkout';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import { GET_COUNSEL } from 'src/graphql/order/getCounsel';
import asyncQuery from 'src/utils/asyncQuery';
import withToken from 'src/utils/withToken';

Checkout.getInitialProps = async (ctx) => {
  await asyncQuery({
    ctx,
    query: GET_COUNSEL,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true
  });

  return {
    namespacesRequired: [...mainLayoutNamespacesRequired, 'checkout', 'myAccount']
  };
};

function Checkout() {
  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <CheckoutPage />
    </MainLayout>
  );
}

export default withToken({ ssr: true, isProtected: true })(Checkout);
