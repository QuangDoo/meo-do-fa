import { useTranslation } from 'i18n';
import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import MyAccountPage from 'src/components/Modules/MyAccount';
import withToken from 'src/utils/withToken';

MyAccount.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'myAccount']
});

function MyAccount() {
  const { t } = useTranslation(['myAccount']);
  return (
    <MainLayout>
      <Head>
        <title>Medofa - {t('myAccount:title')}</title>
      </Head>

      <MyAccountPage />
    </MainLayout>
  );
}

export default withToken({ ssr: true, isProtected: true })(MyAccount);
