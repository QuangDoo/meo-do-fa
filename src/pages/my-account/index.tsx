import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import MyAccountPage from 'src/components/Modules/MyAccount';
import TermPopup from 'src/components/Modules/TermPopup';
import withToken from 'src/utils/withToken';

MyAccount.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'myAccount']
});

function MyAccount() {
  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>
      <TermPopup />

      <MyAccountPage />
    </MainLayout>
  );
}

export default withToken({ ssr: true, isProtected: true })(MyAccount);
