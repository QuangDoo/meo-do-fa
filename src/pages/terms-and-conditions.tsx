import { useTranslation } from 'i18n';
import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import MainLayout from 'src/components/Modules/MainLayout';
import getToken from 'src/utils/getToken';
import withApollo from 'src/utils/withApollo';

TermsAndConditions.getInitialProps = async (ctx) => ({
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
  ],
  token: getToken(ctx)
});

function TermsAndConditions(props) {
  const { t } = useTranslation(['common', 'termsAndConditions']);

  return (
    <MainLayout token={props.token}>
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
