import { useTranslation } from 'i18n';
import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import QuickOrderPage from 'src/components/Modules/QuickOrder/index';
import withToken from 'src/utils/withToken';

QuickOrder.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'cart', 'quickOrder']
});

function QuickOrder() {
  const { t } = useTranslation(['quickOrder']);
  return (
    <MainLayout>
      <Head>
        <title>Medofa - {t('quickOrder:quick_order')}</title>
        <meta property="og:title" content="Quick order" />
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

      <QuickOrderPage />
    </MainLayout>
  );
}

export default withToken({ ssr: true })(QuickOrder);
