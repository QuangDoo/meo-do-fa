import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import QuickOrderPage from 'src/components/Modules/QuickOrder/index';
import withToken from 'src/utils/withToken';

QuickOrder.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'cart', 'quickOrder']
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

export default withToken({ ssr: true })(QuickOrder);
