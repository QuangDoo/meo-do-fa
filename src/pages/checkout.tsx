import React from 'react';
import Head from 'src/components/Layout/Head';
import CheckoutPage from 'src/components/Modules/Checkout';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import getToken from 'src/utils/getToken';
import protectRoute from 'src/utils/protectRoute';
import withApollo from 'src/utils/withApollo';

Checkout.getInitialProps = async (ctx) => {
  protectRoute(ctx);

  return {
    namespacesRequired: [...mainLayoutNamespacesRequired, 'checkout', 'myAccount'],
    token: getToken(ctx)
  };
};

function Checkout(props) {
  return (
    <MainLayout token={props.token}>
      <Head>
        <title>Medofa</title>
      </Head>

      <CheckoutPage />
    </MainLayout>
  );
}

export default withApollo({ ssr: true })(Checkout);
