import React from 'react';
import Head from 'src/components/Layout/Head';
import GlobalLoadingBackdrop from 'src/components/Modules/GlobalLoadingBackdrop';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import MyAccountPage from 'src/components/Modules/MyAccount';
import withToken from 'src/utils/withToken';

import withApollo from '../../utils/withApollo';

MyAccount.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'myAccount']
});

function MyAccount() {
  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <GlobalLoadingBackdrop />

      <MyAccountPage />
    </MainLayout>
  );
}

export default withToken({ ssr: true, isProtected: true })(MyAccount);
