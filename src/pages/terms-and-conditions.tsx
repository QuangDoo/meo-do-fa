import { useTranslation } from 'i18n';
import React from 'react';
import Head from 'src/components/Layout/Head';
import MainLayout from 'src/components/Modules/MainLayout';
import withApollo from 'src/utils/withApollo';

TermsAndConditions.getInitialProps = async () => ({
  namespacesRequired: [
    'common',
    'errors',
    'header',
    'navbar',
    'footer',
    'cart',
    'login',
    'register',
    'termsAndConditions'
  ]
});

function TermsAndConditions() {
  const { t } = useTranslation(['common', 'termsAndConditions']);

  return (
    <MainLayout>
      <Head>
        <title>Medofa</title>
      </Head>

      <div className="container my-5">
        <h2 className="text-center my-5">{t('termsAndConditions:title')}</h2>

        <div className="d-flex justify-content-center align-items-center p-5">
          {t('common:updating')}
        </div>
      </div>
    </MainLayout>
  );
}

export default withApollo({ ssr: true })(TermsAndConditions);
