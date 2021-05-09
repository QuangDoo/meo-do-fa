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
      </Head>

      <QuickOrderPage />
    </MainLayout>
  );
}

export default withToken({ ssr: true })(QuickOrder);
