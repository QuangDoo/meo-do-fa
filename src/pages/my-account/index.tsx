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
        <meta property="og:title" content="My account" />
        <meta
          property="og:description"
          content="Medofa là giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối, nhà thuốc, dược sĩ nhằm hợp tác tạo mối liên kết trực tiếp và gia tăng doanh thu."
        />
        <meta property="og:url" content="https://medofa.com/" />
        <meta
          property="og:image"
          content="https://medofa.com/icons/favicon-32x32-medofa-manifest-20129.png"
        />
      </Head>

      <MyAccountPage />
    </MainLayout>
  );
}

export default withToken({ ssr: true, isProtected: true })(MyAccount);
