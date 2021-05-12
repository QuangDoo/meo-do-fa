import { useTranslation } from 'i18n';
import Head from 'next/head';
import React from 'react';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import Promotions from 'src/components/Modules/Promtions';
import withToken from 'src/utils/withToken';

Promotion.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'promotions']
});

function Promotion(): JSX.Element {
  const { t } = useTranslation('promotions');
  return (
    <MainLayout>
      <Head>
        <title>Medofa - {t('promotions:promotions')}</title>
        <meta property="og:title" content="Promotions" />
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

      <Promotions />
    </MainLayout>
  );
}

export default withToken({ ssr: true })(Promotion);
