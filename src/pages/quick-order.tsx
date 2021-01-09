import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import QuickOrderPage from 'src/components/Modules/QuickOrder/index';
import getToken from 'src/utils/getToken';
import withApollo from 'src/utils/withApollo';

QuickOrder.getInitialProps = async (ctx) => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'cart', 'quickOrder'],
  token: getToken(ctx)
});

function QuickOrder(props) {
  return (
    <MainLayout token={props.token}>
      <Head>
        <title>Medofa</title>
      </Head>

      <QuickOrderPage />
    </MainLayout>
  );
}

export default withApollo({ ssr: true })(QuickOrder);
