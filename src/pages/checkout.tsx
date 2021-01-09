import React from 'react';
import Head from 'src/components/Layout/Head';
import CheckoutPage from 'src/components/Modules/Checkout';
import MainLayout from 'src/components/Modules/MainLayout';
import getToken from 'src/utils/getToken';
import protectRoute from 'src/utils/protectRoute';
import withApollo from 'src/utils/withApollo';

Checkout.getInitialProps = async (ctx) => {
  protectRoute(ctx);

  return {
    namespacesRequired: ['checkout', 'errors', 'common', 'myAccount']
  };
};

function Checkout(props) {
  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <CheckoutPage />
    </MainLayout>
  );
}

export default withApollo({ ssr: true })(Checkout);
