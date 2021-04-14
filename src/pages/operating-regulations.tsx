import { useTranslation } from 'i18n';
import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import withToken from 'src/utils/withToken';

OperatingRegulations.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'operatingRegulations']
});

function OperatingRegulations() {
  const { t } = useTranslation(['common', 'operatingRegulations']);

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <div className="container my-5">
        <h2 className="text-center my-5">{t('operatingRegulations:title')}</h2>

        <p className="text-sub d-flex justify-content-center align-items-center p-5">
          {t('common:updating')}
        </p>
      </div>
    </MainLayout>
  );
}

export default withToken({ ssr: true })(OperatingRegulations);
