import React from 'react';
import Head from 'src/components/Layout/Head';
import CartPage from 'src/components/Modules/Cart';
import MainLayout from 'src/components/Modules/MainLayout';
import getToken from 'src/utils/getToken';
import protectRoute from 'src/utils/protectRoute';
import withApollo from 'src/utils/withApollo';

Cart.getInitialProps = async (ctx) => {
  protectRoute(ctx);

  return {
    namespacesRequired: ['cart', 'common', 'errors'],
    token: getToken(ctx)
  };
};

function Cart(props) {
  return (
    <MainLayout token={props.token}>
      <Head>
        <title>Medofa</title>
      </Head>

      <CartPage />
    </MainLayout>
  );
}

export default withApollo({ ssr: true })(Cart);
