import React from 'react';
import Head from 'src/components/Layout/Head';
import CheckoutPage from 'src/components/Modules/Checkout';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import withToken from 'src/utils/withToken';

Checkout.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'checkout', 'myAccount']
});

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
