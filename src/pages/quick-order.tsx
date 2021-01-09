import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout from 'src/components/Modules/MainLayout';
import QuickOrderPage from 'src/components/Modules/QuickOrder/index';
import withApollo from 'src/utils/withApollo';

QuickOrder.getInitialProps = async () => ({
  namespacesRequired: [
    'header',
    'navbar',
    'footer',
    'errors',
    'common',
    'login',
    'register',
    'password',
    'searchBar',
    'noti',
    'cart',
    'quickOrder'
  ]
});

function QuickOrder() {
  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <QuickOrderPage />
    </MainLayout>
  );
}

export default withApollo({ ssr: true })(QuickOrder);
