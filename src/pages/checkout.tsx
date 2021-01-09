import React from 'react';
import Head from 'src/components/Layout/Head';
import CheckoutPage from 'src/components/Modules/Checkout';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import withApollo from 'src/utils/withApollo';
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

const WithToken = withToken(Checkout, { protected: true });

export default withApollo({ ssr: true })(WithToken);
