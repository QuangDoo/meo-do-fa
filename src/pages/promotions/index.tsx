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
        <meta
          content="Medofa là giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối, nhà thuốc, dược sĩ nhằm hợp tác tạo mối liên kết trực tiếp và gia tăng doanh thu."
          name="description"
        />
        <meta content="index, follow" name="robots" />
        <meta content="website" property="og:type" />
        <meta content="vi_VN" property="og:locale" />
        <meta content="Promotion" property="og:title" />
        <meta
          content="Medofa là giải pháp công nghệ ngành dược kết nối nhà máy, nhà phân phối, nhà thuốc, dược sĩ nhằm hợp tác tạo mối liên kết trực tiếp và gia tăng doanh thu."
          property="og:description"
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
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
