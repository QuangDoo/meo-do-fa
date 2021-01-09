import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import QuickOrderPage from 'src/components/Modules/QuickOrder/index';
import getToken from 'src/utils/getToken';
import withApollo from 'src/utils/withApollo';
import withToken from 'src/utils/withToken';

QuickOrder.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'cart', 'quickOrder']
});

const WithToken = withToken(QuickOrder);

function QuickOrder(props) {
  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <QuickOrderPage />
    </MainLayout>
  );
}

export default withApollo({ ssr: true })(WithToken);
