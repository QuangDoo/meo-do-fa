import { useTranslation } from 'i18n';
import React from 'react';
import Footer from 'src/components/Layout/Footer';
import Head from 'src/components/Layout/Head';
import Header from 'src/components/Layout/Header';
import Nav from 'src/components/Layout/Nav';
import PageLayout from 'src/components/Layout/PageLayout';
import withApollo from 'src/utils/withApollo';

function QuickOrder(): JSX.Element {
  const { t } = useTranslation('common');
  return (
    <>
      <Head>
        <title>Medofa</title>
      </Head>
      <Header />
      <Nav />
      <PageLayout>
        <h1>{t('development')}</h1>
      </PageLayout>
      <Footer />
    </>
  );
}

export default withApollo({ ssr: true })(QuickOrder);
