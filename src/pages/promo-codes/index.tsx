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
      </Head>

      <PromoCodes />
    </MainLayout>
  );
}

export default withToken({ ssr: true })(PromotionCode);
