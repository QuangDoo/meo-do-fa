import { useTranslation } from 'i18n';
import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import PromoCodes from 'src/components/Modules/PromoCodes';
import withToken from 'src/utils/withToken';

PromotionCode.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'promoCodes']
});

function PromotionCode() {
  const { t } = useTranslation('promoCodes');
  return (
    <MainLayout>
      <Head>
        <title>Medofa - {t('promoCodes:promo_codes')}</title>
        <meta property="og:title" content="Promotion Code" />
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

      <PromoCodes />
    </MainLayout>
  );
}

export default withToken({ ssr: true })(PromotionCode);
