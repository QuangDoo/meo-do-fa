import React from 'react';
import Head from 'src/components/Layout/Head';
import CartPage from 'src/components/Modules/Cart';
import MainLayout from 'src/components/Modules/MainLayout';
import withApollo from 'src/utils/withApollo';
import withToken from 'src/utils/withToken';

Cart.getInitialProps = async () => ({
  namespacesRequired: ['cart', 'common', 'errors']
});

function Cart() {
  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <CartPage />
    </MainLayout>
  );
}

const WithToken = withToken(Cart, { protected: true });

export default withApollo({ ssr: true })(WithToken);
