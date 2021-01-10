import React from 'react';
import Head from 'src/components/Layout/Head';
import CartPage from 'src/components/Modules/Cart';
import MainLayout from 'src/components/Modules/MainLayout';
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

export default withToken({ ssr: true, isProtected: true })(Cart);
