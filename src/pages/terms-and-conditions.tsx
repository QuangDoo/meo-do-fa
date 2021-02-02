import { useTranslation } from 'i18n';
import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout, { mainLayoutNamespacesRequired } from 'src/components/Modules/MainLayout';
import TermPopup from 'src/components/Modules/TermPopup';
import withToken from 'src/utils/withToken';

TermsAndConditions.getInitialProps = async () => ({
  namespacesRequired: [...mainLayoutNamespacesRequired, 'termsAndConditions']
});

function TermsAndConditions() {
  const { t } = useTranslation(['common', 'termsAndConditions']);

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>
      <TermPopup />

      <div className="container my-5">
        <h2 className="text-center my-5">{t('termsAndConditions:title')}</h2>

        <div className="d-flex justify-content-center align-items-center p-5">
          {t('common:updating')}
        </div>
      </div>
    </MainLayout>
  );
}

export default withToken({ ssr: true })(TermsAndConditions);
