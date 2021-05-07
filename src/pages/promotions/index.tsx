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
      </Head>

      <Promotions />
    </MainLayout>
  );
}

export default withToken({ ssr: true })(Promotion);
