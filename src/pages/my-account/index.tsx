import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import MyAccountPage from 'src/components/Modules/MyAccount';
import getToken from 'src/utils/getToken';
import protectRoute from 'src/utils/protectRoute';

import withApollo from '../../utils/withApollo';

MyAccount.getInitialProps = async (ctx) => {
  protectRoute(ctx);

  return {
    namespacesRequired: [...mainLayoutNamespacesRequired, 'myAccount'],
    token: getToken(ctx)
  };
};

function MyAccount(props) {
  return (
    <MainLayout token={props.token}>
      <Head>
        <title>Medofa</title>
      </Head>

      <MyAccountPage />
    </MainLayout>
  );
}

export default withApollo({ ssr: true })(MyAccount);
