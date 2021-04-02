import { useTranslation } from 'i18n';
import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import withToken from 'src/utils/withToken';

Pathological.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired]
});

function Pathological() {
  const { t } = useTranslation('common');

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <div className="container text-center py-3">
        <h1 className="text-sub">{t('common:updating')}</h1>
      </div>
    </MainLayout>
  );
}

export default withToken({ ssr: true })(Pathological);
